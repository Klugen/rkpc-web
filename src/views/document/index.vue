<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="listQuery.community_name"
        placeholder="小区"
        clearable
        style="width: 180px"
        class="filter-item"
      >
        <el-option
          v-for="(item, index) in communityListOptions"
          :key="item + index"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-input
        v-model="listQuery.building_number"
        placeholder="楼栋号"
        style="width: 120px"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.unit_number"
        placeholder="单元号"
        style="width: 120px"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
      />

      <el-input
        v-model="listQuery.room_number"
        placeholder="门牌号"
        style="width: 120px"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
      />

      <el-input
        v-model="listQuery.name"
        placeholder="姓名"
        style="width: 120px"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
      />

      <el-input
        v-model="listQuery.idCardNumber"
        placeholder="身份证号码"
        style="width: 240px"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
      />
      <!-- <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select> -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        添加
      </el-button>
      <!-- <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        导出
      </el-button> -->
      <!-- <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox> -->
    </div>

    <el-table
      :key="tableKey"
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

      <el-table-column
        label="操作"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <!-- <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
            Publish
          </el-button>
          <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
            Draft
          </el-button> -->
          <el-button
            v-if="row.status != 'deleted'"
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
            删除
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="140px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="ID" prop="personId" hidden>
          <el-input v-model="temp.personId" style="width: 180px" hidden />
        </el-form-item>

        <el-form-item label="ID" prop="houseId" hidden>
          <el-input v-model="temp.houseId" style="width: 180px" hidden />
        </el-form-item>
        <el-form-item label="小区" prop="communityName">
          <el-select
            v-model="temp.communityName"
            placeholder="小区"
            clearable
            style="width: 180px"
            class="filter-item"
          >
            <el-option
              v-for="(item, index) in communityListOptions"
              :key="item + index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="楼栋号" prop="buildingNumber">
          <el-input v-model="temp.buildingNumber" style="width: 180px" />
        </el-form-item>

        <el-form-item label="单元号" prop="unitNumber">
          <el-input v-model="temp.unitNumber" style="width: 180px" />
        </el-form-item>

        <el-form-item label="房间号" prop="roomNumber">
          <el-input v-model="temp.roomNumber" style="width: 180px" />
        </el-form-item>

        <el-form-item label="家庭关系" prop="householdRelation">
          <el-select
            v-model="temp.householdRelation"
            placeholder="家庭关系"
            clearable
            style="width: 180px"
            class="filter-item"
          >
            <el-option
              v-for="(item, index) in householdRelationListOptions"
              :key="item + index"
              :label="item.value"
              :value="item.code"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" style="width: 180px" />
        </el-form-item>

        <el-form-item label="身份证号" prop="idCardNumber">
          <el-input v-model="temp.idCardNumber" style="width: 240px" />
        </el-form-item>

        <el-form-item label="联系电话" prop="cellphone">
          <el-input v-model="temp.cellphone" style="width: 240px" />
        </el-form-item>

        <el-form-item label="健康情况" prop="healthCondition">
          <el-select
            v-model="temp.healthCondition"
            placeholder="健康情况"
            clearable
            style="width: 180px"
            class="filter-item"
          >
            <el-option
              v-for="(item, index) in healthListOptions"
              :key="item + index"
              :label="item.value"
              :value="item.code"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="居住在本户" prop="isLiveHere">
          <el-checkbox v-model="temp.isLiveHere" />
        </el-form-item>

        <el-form-item label="户口在本户" prop="isHouseHoldHere">
          <el-checkbox v-model="temp.isHouseHoldHere" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  fetchPv,
  createArticle,
  updateArticle,
} from "@/api/article";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import {
  documentList,
  CommunityList,
  householdRelationList,
  healthList,
  updateDocument,
  createDocument,
  deleteDocument,
} from "@/api/rkpc";

const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" },
];

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});

export default {
  name: "ComplexTable",
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    },
  },
  data() {
    return {
      communityListAllOptions: [],
      communityListOptions: [],

      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [
        { label: "ID Ascending", key: "+id" },
        { label: "ID Descending", key: "-id" },
      ],
      statusOptions: ["published", "draft", "deleted"],
      householdRelationListOptions: null,
      healthListOptions: null,
      showReviewer: false,
      temp: {},
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create",
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          { required: true, message: "type is required", trigger: "change" },
        ],
        timestamp: [
          {
            type: "date",
            required: true,
            message: "timestamp is required",
            trigger: "change",
          },
        ],
        title: [
          { required: true, message: "title is required", trigger: "blur" },
        ],
      },
      lastHouse:{},
      downloadLoading: false,
    };
  },
  created() {
    this.getList();
    this.getCommunityList();
    this.getHouseholdRelationListOptions();
    this.getHealthListOptions();
  },
  methods: {
    getHealthListOptions() {
      healthList().then((response) => {
        this.healthListOptions = response.data;
      });
    },

    getHouseholdRelationListOptions() {
      householdRelationList().then((response) => {
        this.householdRelationListOptions = response.data;
      });
    },

    getCommunityList() {
      this.listLoading = true;
      CommunityList().then((response) => {
        console.log("初始化社区列表", response);
        this.communityListAllOptions = response.data;
        this.communityListOptions = response.data;
        this.listLoading = false;
      });
    },

    getList() {
      this.listLoading = true;
      documentList(
        this.listQuery.page,
        this.listQuery.limit,
        this.listQuery
      ).then((response) => {
        console.log(response);
        this.list = response.data.records;
        this.total = response.data.recordCount;

        // Just to simulate the time of the request
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作Success",
        type: "success",
      });
      row.status = status;
    },

    resetTemp() {
      this.temp = {
        personId: null,
        houseId: null,
        communityName: this.lastHouse.communityName,
        buildingNumber: this.lastHouse.buildingNumber,
        unitNumber:this.lastHouse.unitNumber,
        roomNumber:this.lastHouse.roomNumber,
        householdRelation: null,
        name: "",
        idCardNumber: "",
        cellphone: "",
        healthCondition: 1,
        isLiveHere: true,
        isHouseHoldHere: true,
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.lastHouse.communityName = this.temp.communityName;
          this.lastHouse.buildingNumber = this.temp.buildingNumber;
          this.lastHouse.unitNumber = this.temp.unitNumber;
          this.lastHouse.roomNumber = this.temp.roomNumber;

          createDocument(this.temp).then(() => {
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: '"' + this.temp.name + '"的数据新建成功',
              type: "success",
              duration: 2000,
            });
            this.getList();
          });
        }
      });
    },
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          updateDocument(this.temp).then(() => {
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: '"' + this.temp.name + '"的数据更新成功',
              type: "success",
              duration: 2000,
            });
            this.getList();
          });
        }
      });
    },
    handleDelete(row, index) {
      if (!confirm("确定要删除么？")) {
        return;
      }
      var p = {
        personId: row.person_id,
        houseId: row.house_id,
      };
      deleteDocument(p).then(() => {
        this.$notify({
          title: "Success",
          message: '"' + row.name + '"的数据删除成功',
          type: "success",
          duration: 2000,
        });
        this.getList();
      });

      // this.list.splice(index, 1);
    },
    tempObjPropCopy(row) {
      this.temp.houseId = row.house_id;
      this.temp.personId = row.person_id;
      this.temp.communityName = row.community_name;
      this.temp.buildingNumber = row.building_number;
      this.temp.unitNumber = row.unit_number;
      this.temp.roomNumber = row.room_number;
      this.temp.householdRelation = row.household_relation_code;
      this.temp.name = row.name;
      this.temp.idCardNumber = row.id_card_number;
      this.temp.cellphone = row.cellphone;
      this.temp.healthCondition = row.health_condition_code;
      this.temp.isLiveHere = row.is_live_here;
      this.temp.isHouseHoldHere = row.is_house_hold_here;
    },
    handleUpdate(row) {
      this.resetTemp();
      this.tempObjPropCopy(row);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },

    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = ["timestamp", "title", "type", "importance", "status"];
        const filterVal = [
          "timestamp",
          "title",
          "type",
          "importance",
          "status",
        ];
        const data = this.formatJson(filterVal);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list",
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal) {
      return this.list.map((v) =>
        filterVal.map((j) => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    getSortClass: function (key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}` ? "ascending" : "descending";
    },
  },
};
</script>
