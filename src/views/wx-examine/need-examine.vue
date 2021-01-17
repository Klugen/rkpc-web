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

      <el-table-column width="70px" align="center" label="已登记">
        <template slot-scope="{ row }">
          <span
            ><i
              v-if="row.docment_person_id"
              class="el-icon-success"
              style="font-size: 20px; color: #ff7744; cursor: pointer"
              @click="showDocument(row)" />
            <i
              v-else
              class="el-icon-error"
              style="font-size: 20px; color: #0066ff"
          /></span>
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

      <el-table-column width="140px" align="center" label="健康状况">
        <template slot-scope="{ row }">
          <span>{{ row.health_condition }}</span>
        </template>
      </el-table-column>

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

      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="doExamine(row)">
            审核
          </el-button>
          <el-button
            v-if="row.status != 'deleted'"
            size="mini"
            type="danger"
            @click="cancelExamine(row)"
          >
            放弃
          </el-button>
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

    <el-dialog
      v-el-drag-dialog
      title="底层数据"
      :visible.sync="showDocumentData"
      width="960"
      @dragDialog="handleDrag"
    >
      <el-table :data="homeMember">
        <el-table-column label="地址" width="240">
          <template slot-scope="{ row }">
            <span
              >{{ row.community_name }} {{ row.building_number }}栋
              {{ row.unit_number }}单元 {{ row.room_number }}号</span
            >
          </template>
        </el-table-column>
        <el-table-column label="关系" property="family_relation" width="75" />
        <el-table-column label="姓名" property="name" width="75" />
        <el-table-column label="性别" property="gender" width="75" />
        <el-table-column label="年龄" property="age" width="75" />
        <el-table-column label="身份证" property="id_card_number" width="180" />
        <el-table-column label="健康状况" property="health_condition" width="100" />
        <el-table-column label="联系电话" property="cellphone" width="120" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import {
  getNeedExamineList,
  ExaminePerson,
  CancelExaminePerson,
  GetDocumentPerson,
} from "@/api/rkpc";

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
      showDocumentData: false,
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
      const { data } = await getNeedExamineList(
        this.listQuery.page,
        this.listQuery.limit
      );
      this.list = data.records;
      this.total = data.recordCount;
      //   this.list = items.map(v => {
      //     this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
      //   //  v.originalTitle = v.title //  will be used when user click the cancel botton
      //     return v
      //   })
      this.listLoading = false;
    },
    doExamine(row) {
      var id = row.person_id;

      ExaminePerson(id).then((response) => {
        this.$message({
          message: "审核成功",
          type: "success",
        });
        this.getList();
      });
    },
    cancelExamine(row) {
      var id = row.person_id;
      CancelExaminePerson(id).then((response) => {
        this.$message({
          message: "操作成功",
          type: "success",
        });
        this.getList();
      });
    },
    showDocument(row) {
      var id = row.docment_person_id;
      GetDocumentPerson(id).then((response) => {
        this.homeMember = response.data;
        console.log(this.homeMember);
        this.showDocumentData = true;
      });
    },
    handleDrag(e) {},
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
