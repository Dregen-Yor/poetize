<script setup>
import { Orange,Picture } from '@element-plus/icons-vue'
import emoji from "../common/emoji.vue";
import proButton from "../common/proButton.vue";
import uploadPicture from "../common/uploadPicture.vue";
</script>
<template>
  <div>
    <!-- 框 -->
    <textarea
      class="comment-textarea"
      v-model="commentContent"
      placeholder="写下点什么..."
      maxlength="1000"/>
    <!-- 按钮 -->
    <div class="myBetween" style="margin-bottom: 10px">
      <div style="display: flex">
        <div :class="{'emoji-active':showEmoji}"
             @click="showEmoji = !showEmoji">
          <el-icon class="myEmoji"><Orange /></el-icon>
          <!-- <i class="el-icon-orange myEmoji"></i> -->
        </div>
        <div @click="openPicture()">
          <el-icon class="myPicture"><Picture /></el-icon>
          <!-- <i class="el-icon-picture myPicture"></i> -->
        </div>
      </div>

      <div style="display: flex">
<!--        <proButton :info="'涂鸦'"-->
<!--                   v-show="!$common.mobile() && !disableGraffiti"-->
<!--                   @click="showGraffiti()"-->
<!--                   :before="$constant.before_color_1"-->
<!--                   :after="$constant.after_color_1"-->
<!--                   style="margin-right: 6px">-->
<!--        </proButton>-->
        <proButton :info="'提交'"
                   @click="submitComment()"
                   :before="$constant.before_color_2"
                   :after="$constant.after_color_2">
        </proButton>
      </div>
    </div>
    <!-- 表情 -->
    <emoji @addEmoji="addEmoji" :showEmoji="showEmoji"></emoji>

    <el-dialog title="图片"
               v-model="showPicture"
               width="25%"
               :append-to-body="true"
               :close-on-click-modal="false"
               destroy-on-close
               center>
      <div>
        <uploadPicture :prefix="'commentPicture'" @addPicture="addPicture" :maxSize="2"
                       :maxNumber="1"></uploadPicture>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    props: {
      disableGraffiti: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        commentContent: "",
        showEmoji: false,
        showPicture: false,
        picture: {
          name: this.$store.state.currentUser.username,
          url: ""
        }
      };
    },
    methods: {
      openPicture() {
        if (this.$common.isEmpty(this.$store.state.currentUser)) {
          this.$message({
            message: "请先登录！",
            type: "error"
          });
          return;
        }

        this.showPicture = true;
      },

      addPicture(res) {
        this.picture.url = res;
        this.savePicture();
      },
      savePicture() {
        let img = "[" + this.picture.name + "," + this.picture.url + "]";
        this.commentContent += img;
        this.picture.url = "";
        this.showPicture = false;
      },
      addEmoji(key) {
        this.commentContent += key;
      },
      showGraffiti() {
        if (this.$common.isEmpty(this.$store.state.currentUser)) {
          this.$message({
            message: "请先登录！",
            type: "error"
          });
          return;
        }

        this.commentContent = "";
        this.$emit("showGraffiti");
      },
      submitComment() {
        if (this.$common.isEmpty(this.$store.state.currentUser)) {
          this.$message({
            message: "请先登录！",
            type: "error"
          });
          return;
        }

        if (this.commentContent.trim() === "") {
          this.$message({
            message: "你还没写呢~",
            type: "warning"
          });
          return;
        }
        this.$emit("submitComment", this.commentContent.trim());
        this.commentContent = "";
      }
    }
  }
</script>

<style scoped>
  .comment-textarea {
    border: 1px solid var(--lightGray);
    width: 100%;
    font-size: 14px;
    padding: 15px;
    min-height: 180px;
    /* 不改变大小 */
    resize: none;
    /* 不改变边框 */
    outline: none;
    border-radius: 4px;
    background-image: var(--commentURL);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 100%;
    margin-bottom: 10px;
  }

  .comment-textarea:focus {
    border-color: var(--themeBackground);
  }

  .myEmoji {
    font-size: 18px;
    cursor: pointer;
    transition: all 0.5s;
    margin-right: 12px;
  }

  .myEmoji:hover {
    transform: rotate(360deg);
    font-size: 22px;
  }

  .myPicture {
    font-size: 18px;
    cursor: pointer;
  }

  .emoji-active {
    color: var(--red);
  }
</style>
