<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="小区名称" min-width="240px">
        <template slot-scope="{ row }">
          <span
            >{{ row.community_name }} {{ row.building_number }}栋
            {{ row.unit_number }}单元 {{ row.room_number }}号</span
          >
        </template>
      </el-table-column>

      <el-table-column width="140px" align="center" label="家庭关系">
        <template slot-scope="{ row }">
          <span>{{ row.family_relation }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="姓名">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="性别">
        <template slot-scope="{ row }">
          <span>{{ row.gender }}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="年龄">
        <template slot-scope="{ row }">
          <span>{{ row.age }}</span>
        </template>
      </el-table-column>

      <el-table-column width="140px" align="center" label="联系电话">
        <template slot-scope="{ row }">
          <span>{{ row.cellphone }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="140px" align="center" label="健康状况">
        <template slot-scope="{ row }">
          <span>{{ row.health_condition }}</span>
        </template>
      </el-table-column> -->

      <el-table-column width="180px" align="center" label="身份证号码">
        <template slot-scope="{ row }">
          <span>{{ row.id_card_number }}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="是否居住">
        <template slot-scope="{ row }">
          <span
            ><i
              v-if="row.is_live_here"
              class="el-icon-success"
              style="font-size: 20px; color: green" />
            <i v-else class="el-icon-error" style="font-size: 20px; color: red"
          /></span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="是否户口注册地">
        <template slot-scope="{ row }">
          <span
            ><i
              v-if="row.is_house_hold_here"
              class="el-icon-success"
              style="font-size: 20px; color: green" />
            <i v-else class="el-icon-error" style="font-size: 20px; color: red"
          /></span>
        </template>
      </el-table-column>
     <el-table-column width="180px" align="center" label="户口登记地">
        <template slot-scope="{ row }">
          <span>{{ row.registered_residence_other }}</span>
        </template>
      </el-table-column>
       
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { getNotNeedExamineList } from "@/api/rkpc";

export default {
  name: "InlineEditTable",
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
      },
      total: 100,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      const { data } = await getNotNeedExamineList(
        this.listQuery.page,
        this.listQuery.limit
      );
      this.list = data.records;
      this.total = data.recordCount;

      this.listLoading = false;
    },
     
  },
};
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
