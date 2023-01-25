<template>
  <div class="home">
    <!-- 1. Top boxes -->
    <div class="header">
      <div class="item">
        {{ $t('home.totalSales') }}
        <div class='num'>{{ objCount.saleTotal | num }}</div>
        <div class="bottom">Today: {{ objCount.sale | num }}</div>
      </div>
      <div class="item">
        {{ $t('home.totalViews') }}
        <div class='num'>{{ objCount.viewsTotal | num }}</div>
        <div class="bottom">Today: {{ objCount.views | num }}</div>
      </div>
      <div class="item">Total Collects
        <div class='num'>{{ objCount.collectTotal | num }}</div>
        <div class="bottom">Today: {{ objCount.collect | num }}</div>
      </div>
      <div class="item">Total Payments
        <div class='num'>{{ objCount.payTotal | num }}</div>
        <div class="bottom">Today: {{ objCount.pay | num }}</div>
      </div>
    </div>

    <!-- 2. Middle charts -->
    <div class="content">
      <div class="time-info border" id='box13'>
        <div class="title">Monthly Sales</div>
        <div id="lineChart" style="width: 100%; height: 300px"></div>
      </div>
      <div class="area border" id="box1">Sales Percentage
        <div id="pieChart" style="width: 100%; height: 300px"></div>
      </div>
    </div>


    <!-- 3. Bottom boxes  -->
    <div class="home-footer">
      <el-card class="box-card">
        <div class="card-header">
          <span>Today</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div class="title">Order</div>
              <div class="value">{{ list.curOrderCount }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">Confirmed Order</div>
              <div class="value">{{ list.curCollect }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">Accumulated</div>
              <div class="value">{{ list.curMoney }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="card-header">
          <span>Month</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div class="title">Order</div>
              <div class="value">{{ list.orderCount }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">Confirmed Order</div>
              <div class="value">{{ list.collect }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">Accumulated</div>
              <div class="value">{{ list.money }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="card-header">
          <span>快捷入口</span>
        </div>
        <div class="text item">
          <el-button type="primary">产品管理</el-button>
          <el-button>消息管理</el-button>
          <el-button>内容管理</el-button>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  data() {
    return {
      objCount: {},
      list: {}
    }
  },
  filters: {
    num(val) {
      if(!val)
        return "";
      return val.toLocaleString();
    }
  },
  mounted() {
    this.getHomeCount();
    this.getHomeCharts();
    this.getHomeOrder();
  },
  methods: {
    async getHomeCount() {
      let res = await this.$api.getHomeCount();
      this.objCount = res.data.data.list;
    },
    async getHomeCharts() {
      let res = await this.$api.getHomeCharts();
      let result = res.data.result.data.sale_money;
      let x_data = [];
      let y_data = [];
      let y_bar_data = [];
      let pie_data = [];
      result.forEach(ele => {
        x_data.push(ele.name);
        y_data.push(ele.total_amount);
        y_bar_data.push(ele.num);
        let obj = {};
        obj.name = ele.name;
        obj.value = ele.total_amount;
        pie_data.push(obj);
      });
      this.line(x_data, y_data, y_bar_data);
      this.pie(pie_data);
    },
    async getHomeOrder() {
      let res = await this.$api.getHomeOrder();
      this.list = res.data.list;
    },

    line(x_data, y_data, y_bar_data) {
      const chartDom = document.getElementById('lineChart');
      const myChart = echarts.init(chartDom);
      let option;
      option = {
        legend: {
          data: ['Sales', 'Income']
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          data: x_data
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Sales',
            data: y_data,
            type: 'line',
            smooth: true
          },
          {
            name: 'Income',
            data: y_bar_data,
            type: 'bar',
            smooth: true
          }
        ]
      };
      option && myChart.setOption(option);
    },

    pie(pie_data) {
      const chartDom = document.getElementById('pieChart');
      const myChart = echarts.init(chartDom);
      let option;
      option = {
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: pie_data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      option && myChart.setOption(option);
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  margin: 10px;
}

.header {
  display: flex;
  padding-right: 30px;

  .item {
    flex: 1;
    height: 100px;
    padding: 10px;
    background: #fff;
    border-radius: 10px;
    margin-left: 20px;
    margin-right: 20px;
    font-weight: bold;
    color: #fff;
    // text-align: center;
    position: relative;

    .num {
      font-size: 22px;
      margin: 10px;
      color: #fff;
    }

    .bottom {
      position: absolute;
      border-top: 1px solid rgb(246, 245, 245);
      padding: 10px 20px;
      bottom: 0;
      right: 0;
      left: 0;
      color: #fff;
      font-weight: normal;
    }
  }

  .item:nth-child(1) {
    background-image: linear-gradient(#df887d, #88554d);
  }

  .item:nth-child(2) {
    background-image: linear-gradient(#409eff, #2e556e);
  }

  .item:nth-child(3) {
    background-image: linear-gradient(#b54fa8, #713c7a);
  }

  .item:nth-child(4) {
    background-image: linear-gradient(#1cd2f1, #39717a);
  }
}

// 图表
.border {
  border: 1px solid #eee;
  background: #eee;
}

.content {
  margin: 20px;
  display: flex;
  height: 320px;

  .time-info {
    flex: 2;
    background: #fff;
    margin-right: 20px;
    padding: 10px;
  }

  .area {
    flex: 1;
    background: #fff;
    padding: 10px;
  }
}

//内容

.home-footer {
  display: flex;
  padding-left: 20px;
  margin-bottom: 20px;

  .box-card {
    flex: 1;
    margin-right: 30px;

    span {
      font-weight: 600;
    }
  }

  .item {
    text-align: center;
    .el-col {
      border-right: 1px solid #eee;
    }
    .el-col:last-child {
      border-right: none;
    }
    .title {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .value {
      font-size: 16px;
    }
  }
}
</style>
