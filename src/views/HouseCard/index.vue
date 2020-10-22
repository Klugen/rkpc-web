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
        @click="ExportHK"
      >
        导出
      </el-button>

      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="ExportPerson"
      >
        导出人员情况
      </el-button>

      <!-- <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        data-field="AAAAAAAAAAAa"
        @click="exportTest"
      >
        带日期的导出
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
          <el-tag
            style="cursor: hand"
            @click="onTagClick(row.persons)"
          >家庭成员</el-tag>
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
    <el-dialog
      v-el-drag-dialog
      title="家庭成员"
      :visible.sync="showHomeMember"
      custom-class="customWidth"
      @dragDialog="handleDrag"
    >
      <el-table :data="homeMember">
        <el-table-column label="关系" property="relationship" width="75" />
        <el-table-column label="姓名" property="name" width="75" />
        <el-table-column label="性别" property="sex" width="75" />
        <el-table-column label="年龄" property="age" width="75" />
        <el-table-column label="身份证" property="idCardNumber" width="180" />
        <el-table-column label="健康状况" property="health" />
        <el-table-column label="联系电话" property="cellPhone" />
      </el-table>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      title="导出日期选择"
      :visible.sync="showExportDateSelect"
    >
      <el-form>
        <el-form-item label="请选择导出日期">
          <el-date-picker
            v-model="temp.date"
            type="date"
            placeholder="不选择，则导出全部"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showExportDateSelect = false">取消</el-button>
        <el-button type="primary" @click="beginExport">开始导出</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { hkall, CommunityList } from '@/api/rkpc'
import { MessageBox } from 'element-ui'
import store from '@/store'
import elDragDialog from '@/directive/el-drag-dialog'
import axios from 'axios'
// import { ElSelect } from 'element-ui/types/select'

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves, elDragDialog },
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
      communityListAllOptions: [],
      communityListOptions: [],
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
      downloadLoading: false,
      homeMember: [],
      showHomeMember: false,
      showExportDateSelect: false
    }
  },
  created() {
    this.listQuery.pageIndex = 1
    this.listQuery.pageSize = 20
    this.listQuery.query = ''
    this.communityListAllOptions = []
    this.communityListOptions = []
    this.getList()
    this.getCommunityList()
  },
  methods: {

    ExportHK(e) {
      let communityName = this.listQuery.query
      communityName = communityName.replace(/\s+/g, '')
      if (communityName === '') {
        MessageBox.confirm('您必须指定一个导出的小区', '错误', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      this.exportSet = 'HK'
      this.showExportDateSelect = true
    },

    ExportPerson(e) {
      let communityName = this.listQuery.query
      communityName = communityName.replace(/\s+/g, '')
      if (communityName === '') {
        MessageBox.confirm('您必须指定一个导出的小区', '错误', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      this.exportSet = 'Person'
      this.showExportDateSelect = true
    },

    beginExport(e) {
      this.showExportDateSelect = false
      if (this.temp.date) {
        const m = new Date(this.temp.date)
        const s = m.getFullYear() + '-' + ((m.getMonth() + 1 >= 10) ? (m.getMonth() + 1) : '0' + (m.getMonth() + 1)) + '-' +
      ((m.getDate() >= 10) ? m.getDate() : '0' + m.getDate())
        this.selectExprtDate = s
      } else {
        this.selectExprtDate = ''
      }
      if (this.exportSet === 'Person') {
        this.handleDownloadPerson()
      } else if (this.exportSet === 'HK') {
        this.handleDownload()
      }
    },

    onTagClick(e) {
      console.log('tag', '标题被点击，准备执行')
      console.log('tag', e)
      this.showHomeMember = true
      this.homeMember = e
    },
    handleDrag(e) {

    },
    clearQuery() {
      this.listQuery.query = ''
      this.getList()
    },
    test(e) {
      // console.log(e)
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
        console.log('初始化社区列表', response)
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
    handleDownloadPerson() {
      this.downloadLoading = true
      let communityName = this.listQuery.query
      communityName = communityName.replace(/\s+/g, '')
      if (communityName === '') {
        MessageBox.confirm('您必须指定一个导出的小区', '错误', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        this.downloadLoading = false
        return
      }
      let isFind = false
      let next = false
      // console.log(communityName)
      this.communityListAllOptions.forEach((element) => {
        // console.log(communityName,element,communityName === element.replace(/\s+/g, ""))
        isFind = (communityName === element.replace(/\s+/g, ''))
        if (isFind) {
          next = true
          return false
        }
      })

      if (!next) {
        MessageBox.confirm('您必须选择一个有效的小区', '错误', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        this.downloadLoading = false
        return
      }
      next = false
      const token = store.getters.token

      axios.get(process.env.VUE_APP_BASE_API + '/hk/exportpersonexccel', {
        headers: {
          token: token
        },
        method: 'post',
        responseType: 'blob',
        params: { token: token, community: communityName, selectdate: this.selectExprtDate }
      })
        .then(res => {
          // console.log(res)
          if (!res) return
          const blob = new Blob([res.data], {
            type: 'application/vnd.ms-excel;charset=utf-8'
          })
          const url = window.URL.createObjectURL(blob)
          const aLink = document.createElement('a')
          aLink.style.display = 'none'
          aLink.href = url
          aLink.setAttribute('download', communityName + '人口信息.xls') // 下载的文件
          document.body.appendChild(aLink)
          aLink.click()
          document.body.removeChild(aLink)
          window.URL.revokeObjectURL(url)
        })
        .catch(error => {
          this.$message.error(error)
        })
      this.downloadLoading = false
    },
    handleDownload() {
      this.downloadLoading = true
      let communityName = this.listQuery.query
      communityName = communityName.replace(/\s+/g, '')
      if (communityName === '') {
        MessageBox.confirm('您必须指定一个导出的小区', '错误', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        this.downloadLoading = false
        return
      }

      let isFind = false
      let next = false
      // console.log(communityName)
      this.communityListAllOptions.forEach((element) => {
        // console.log(communityName,element,communityName === element.replace(/\s+/g, ""))
        isFind = (communityName === element.replace(/\s+/g, ''))
        if (isFind) {
          next = true
          return false
        }
      })

      if (!next) {
        MessageBox.confirm('您必须选择一个有效的小区', '错误', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        this.downloadLoading = false
        return
      }
      next = false

      // 准备发起发起请求

      const token = store.getters.token

      axios.get(process.env.VUE_APP_BASE_API + '/hk/exportexcel', {
        headers: {
          token: token
        },
        method: 'post',
        responseType: 'blob',
        params: { token: token, community: communityName, selectdate: this.selectExprtDate }
      })
        .then(res => {
          // console.log(res)
          if (!res) return
          const blob = new Blob([res.data], {
            type: 'application/vnd.ms-excel;charset=utf-8'
          })
          const url = window.URL.createObjectURL(blob)
          const aLink = document.createElement('a')
          aLink.style.display = 'none'
          aLink.href = url
          aLink.setAttribute('download', communityName + '.xls') // 下载的文件
          document.body.appendChild(aLink)
          aLink.click()
          document.body.removeChild(aLink)
          window.URL.revokeObjectURL(url)
        })
        .catch(error => {
          this.$message.error(error)
        })
      this.downloadLoading = false
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
<style>
.customWidth {
  width: 800px;
}
</style>
