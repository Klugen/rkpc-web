<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input
        v-model="listQuery.query"
        placeholder="搜索内容"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      /> -->
      <!-- <el-select
        v-model="listQuery.query"
        :remote-method="filterCommunityList"
        filterable
        default-first-option
        placeholder="选择社区"
        @mousedown="test"
      > -->
      <el-select
        v-model="listQuery.query"
        :remote-method="filterCommunityList"
        filterable
        default-first-option
        placeholder="选择社区"
        @mousedown="test"
      >
        <el-option
          v-for="(item, index) in communityListOptions"
          :key="item + index"
          :label="item"
          :value="item"
        />
      </el-select>

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
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-arrow-left"
        @click="clearQuery"
      >
        清空
      </el-button>
      <!-- <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button> -->
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        导出
      </el-button>
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
      @sort-change="sortChange"
    >
      <!-- <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="小区" width="150px" align="center">
        <template slot-scope="{ row }">
          <!-- <span>{{ row.timestamp | parseTime("{y}-{m}-{d} {h}:{i}") }}</span> -->
          <span>{{ row.community }}</span>
        </template>
      </el-table-column>

      <el-table-column label="地址" width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.addr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="户主姓名" width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.homeMaster }}</span>
        </template>
      </el-table-column>

      <el-table-column label="居住在本户" width="75px" align="center">
        <el-table-column label="人数" width="75px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.c1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="户口在本社区" width="75px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.c2 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="户口在其他社区" width="75px" align="center">
          <el-table-column label="人数" width="75px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.c3 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="离开户口登记地不满半年"
            width="75px"
            align="center"
          >
            <template slot-scope="{ row }">
              <span>{{ row.c4 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="离开户口登记地半年以上"
            width="75px"
            align="center"
          >
            <template slot-scope="{ row }">
              <span>{{ row.c5 }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="户口待定" width="75px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.c6 }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="户口在本户但未居住在本户"
        width="75px"
        align="center"
      >
        <el-table-column label="人数" width="75px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.c7 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="现居住在本村（居）委会其他小区的人数"
          width="75px"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.c8 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="现居住在本村（居）委会以外"
          width="75px"
          align="center"
        >
          <el-table-column label="人数" width="75px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.c9 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="离开本村居委会不满半年的人数"
            width="75px"
            align="center"
          >
            <template slot-scope="{ row }">
              <span>{{ row.c10 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="离开本村居委会半年以上的人数"
            width="75px"
            align="center"
          >
            <template slot-scope="{ row }">
              <span>{{ row.c11 }}</span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table-column>

      <el-table-column label="出生人数" width="60px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.c12 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="死亡人数" width="60px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.c13 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="港澳台居民和外籍人员数"
        width="60px"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.c14 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" width="130px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.cellPhone }}</span>
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
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { hkall, CommunityList } from '@/api/rkpc'

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id',
        query: ''
      },
      importanceOptions: [1, 2, 3],

      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          { required: true, message: 'type is required', trigger: 'change' }
        ],
        timestamp: [
          {
            type: 'date',
            required: true,
            message: 'timestamp is required',
            trigger: 'change'
          }
        ],
        title: [
          { required: true, message: 'title is required', trigger: 'blur' }
        ]
      },
      downloadLoading: false
    }
  },
  created() {
    this.listQuery.pageIndex = 1
    this.listQuery.pageSize = 20
    this.listQuery.query = ''
    this.getList()
    this.getCommunityList()
    this.communityListAllOptions = []
    this.communityListOptions = []
  },
  methods: {
    clearQuery() {
      this.listQuery.query = ''
      this.getList()
    },
    test(e) {
      console.log(e)
    },
    filterCommunityList(query) {
      query = query.replace(/\s+/g, '')
      if (query === '') return
      this.communityListOptions = []
      this.communityListAllOptions.forEach((element) => {
        if (element.indexOf(query) > 0) {
          this.communityListOptions.push(element)
        }
      })
    },
    getCommunityList() {
      this.listLoading = true
      CommunityList().then((response) => {
        this.communityListAllOptions = response.data
        this.communityListOptions = response.data
        this.listLoading = false
      })
    },
    getList() {
      this.listLoading = true
      this.listQuery.pageIndex = this.listQuery.page
      this.listQuery.pageSize = this.listQuery.limit
      hkall(this.listQuery).then((response) => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1

      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    // sortByID(order) {
    //   if (order === "ascending") {
    //     this.listQuery.sort = "+id";
    //   } else {
    //     this.listQuery.sort = "-id";
    //   }
    //   this.handleFilter();
    // },
    // resetTemp() {
    //   this.temp = {
    //     id: undefined,
    //     importance: 1,
    //     remark: "",
    //     timestamp: new Date(),
    //     title: "",
    //     status: "published",
    //     type: "",
    //   };
    // },
    // handleCreate() {
    //   this.resetTemp();
    //   this.dialogStatus = "create";
    //   this.dialogFormVisible = true;
    //   this.$nextTick(() => {
    //     this.$refs["dataForm"].clearValidate();
    //   });
    // },
    // createData() {
    //   this.$refs["dataForm"].validate((valid) => {
    //     if (valid) {
    //       this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id
    //       this.temp.author = "vue-element-admin";
    //       createArticle(this.temp).then(() => {
    //         this.list.unshift(this.temp);
    //         this.dialogFormVisible = false;
    //         this.$notify({
    //           title: "Success",
    //           message: "Created Successfully",
    //           type: "success",
    //           duration: 2000,
    //         });
    //       });
    //     }
    //   });
    // },
    // handleUpdate(row) {
    //   this.temp = Object.assign({}, row); // copy obj
    //   this.temp.timestamp = new Date(this.temp.timestamp);
    //   this.dialogStatus = "update";
    //   this.dialogFormVisible = true;
    //   this.$nextTick(() => {
    //     this.$refs["dataForm"].clearValidate();
    //   });
    // },
    // updateData() {
    //   this.$refs["dataForm"].validate((valid) => {
    //     if (valid) {
    //       const tempData = Object.assign({}, this.temp);
    //       tempData.timestamp = +new Date(tempData.timestamp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
    //       updateArticle(tempData).then(() => {
    //         const index = this.list.findIndex((v) => v.id === this.temp.id);
    //         this.list.splice(index, 1, this.temp);
    //         this.dialogFormVisible = false;
    //         this.$notify({
    //           title: "Success",
    //           message: "Update Successfully",
    //           type: "success",
    //           duration: 2000,
    //         });
    //       });
    //     }
    //   });
    // },
    // handleDelete(row, index) {
    //   this.$notify({
    //     title: "Success",
    //     message: "Delete Successfully",
    //     type: "success",
    //     duration: 2000,
    //   });
    //   this.list.splice(index, 1);
    // },
    // handleFetchPv(pv) {
    //   fetchPv(pv).then((response) => {
    //     this.pvData = response.data.pvData;
    //     this.dialogPvVisible = true;
    //   });
    // },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then((excel) => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = [
          'timestamp',
          'title',
          'type',
          'importance',
          'status'
        ]
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map((v) =>
        filterVal.map((j) => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
