<template>
  <el-table
    :data="list"
    style="width: 100%; padding-top: 15px"
    @sort-change="changeSort"
  >
    <el-table-column label="社区" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.name.replace('"', "").replace('"', "") }}
      </template>
    </el-table-column>
    <el-table-column
      label="总采集户数"
      min-width="195"
      align="center"
      prop="h"
      sortable="true"
    >
      <template slot-scope="scope">
        {{ scope.row.h }}
      </template>
    </el-table-column>
    <el-table-column
      label="总采集人数"
      min-width="100"
      align="center"
      prop="p"
      sortable="custom"
    >
      <template slot-scope="scope">
        {{ scope.row.p }}
      </template>
    </el-table-column>
    <el-table-column
      label="今日新增户数"
      min-width="100"
      align="center"
      prop="th"
      sortable="custom"
    >
      <template slot-scope="scope">
        {{ scope.row.th }}
      </template>
    </el-table-column>
    <el-table-column
      label="今日新增人数"
      min-width="100"
      align="center"
      prop="tp"
      sortable="custom"
    >
      <template slot-scope="scope">
        {{ scope.row.tp }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

import { initCommunityInfo } from "@/api/dashboard";
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: "success",
        pending: "danger",
      };
      return statusMap[status];
    },
    orderNoFilter(str) {
      return str.substring(0, 30);
    },
  },
  data() {
    return {
      list: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      initCommunityInfo().then((response) => {
        this.$data.list = response.data;
        this.list.sort(function (a, b) {
          return b.h - a.h;
        });
      });
    },
    //  sortChange(column,prop,order){
    //       if(column.prop == null || column.order == null){
    //         this.queryData.prop = "";
    //         this.queryData.order = "";
    //       }else{
    //          this.queryData.prop = column.prop;
    //          this.queryData.order = column.order;
    //       }
    //       this.getList();
    //     }，
    changeSort(column, prop, order) {
      let v = column.order || "descending";
      if (column.prop === "h") {
        this.list.sort(function (a, b) {
          if (v === "ascending") {
            return a.h - b.h;
          } else {
            return b.h - a.h;
          }
        });
      }
      if (column.prop === "p") {
        this.list.sort(function (a, b) {
          if (v === "ascending") {
            return a.p - b.p;
          } else {
            return b.p - a.p;
          }
        });
      }
      if (column.prop === "th") {
        this.list.sort(function (a, b) {
          if (v === "ascending") {
            return a.th - b.th;
          } else {
            return b.th - a.th;
          }
        });
      }
      if (column.prop === "tp") {
        this.list.sort(function (a, b) {
          if (v === "ascending") {
            return a.tp - b.tp;
          } else {
            return b.tp - a.tp;
          }
        });
      }
    },
  },
};
</script>
