<template>
  <el-row :gutter="24" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <!-- <svg-icon icon-class="peoples" class-name="card-panel-icon" /> -->
          <i
            class="el-icon-s-home card-panel-icon"
            class-name="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">采集户数</div>
          <count-to
            :start-val="ch"
            :end-val="h"
            :duration="2600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <!-- <svg-icon icon-class="message" class-name="card-panel-icon" /> -->
          <i
            class="el-icon-s-custom card-panel-icon"
            class-name="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">采集人数</div>
          <count-to
            :start-val="cp"
            :end-val="p"
            :duration="3000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <!-- <svg-icon icon-class="money" class-name="card-panel-icon" /> -->
          <i
            class="el-icon-s-order card-panel-icon"
            class-name="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">今日提交</div>
          <count-to
            :start-val="ct"
            :end-val="t"
            :duration="3200"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <!-- <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <i class="el-icon-s-flag card-panel-icon" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            提交社区
          </div>
          <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col> -->
  </el-row>
</template>

<script>
import CountTo from "vue-count-to";
import { initDataBoardData } from "@/api/dashboard";
import request from "@/utils/request";
export default {
  components: {
    CountTo,
  },

  mounted() {
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
         console.log("定时器启动");
        this.$data.ch = this.$data.h;
        this.$data.cp = this.$data.p;
        this.$data.ct = this.$data.t;
        this.loadData();
      }, 60000);
    }
  },
  created() {
    this.loadData();
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  watch: {
    
  },
  data() {
    return {
      h: 100,
      p: 1000,
      t: 20,
      ch: 0,
      cp: 0,
      ct: 0,
    };
  },
  methods: {
    loadData() {
      initDataBoardData().then((response) => {
        this.$data.h = response.data.familyCount;
        this.$data.p = response.data.peopleCount;
        this.$data.t = response.data.todayFamilyCount;
      });
    },
    handleSetLineChartData(type) {
      // this.$emit('handleSetLineChartData', type)
    },
    // timer() {
    //   return setTimeout(() => {
    //     console.log("定时器启动");
    //     this.$data.ch = this.$data.h;
    //     this.$data.cp = this.$data.p;
    //     this.$data.ct = this.$data.t;
    //     this.loadData();
    //   }, 60000);
    // },
  },
};
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 150px;
    cursor: pointer;
    font-size: 16px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 96px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 45px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 24px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 32px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
