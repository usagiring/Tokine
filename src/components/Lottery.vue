<template>
  <div>
    <p class="lottery">双色球概率表 {{begin}} - {{last}}</p>
    <div id="red-chart"></div>
    <div id="blue-chart"></div>
  </div>
</template>


<script>
import * as echarts from "echarts";
import { get } from "../utilities/rest";

export default {
  data() {
    return {
      begin: "",
      last: ""
    };
  },
  async mounted() {
    const redChart = echarts.init(document.getElementById("red-chart"));
    const blueChart = echarts.init(document.getElementById("blue-chart"));
    let data = await get("/lottery");
    this.begin = data.begin
    this.last = data.last
    let redArray = Object.entries(data.redCount);
    redArray = redArray.sort((a, b) => {
      return b[1] - a[1];
    });

    redChart.setOption({
      title: {
        text: "红球概率图"
      },
      tooltip: {},
      xAxis: {},
      yAxis: {
        data: redArray.map(item => item[0])
      },
      series: [
        {
          name: "频率",
          type: "bar",
          data: redArray.map(item => item[1])
        }
      ]
    });

    let blueArray = Object.entries(data.blueCount);
    blueArray = blueArray.sort((a, b) => {
      return b[1] - a[1];
    });

    blueChart.setOption({
      title: {
        text: "蓝球概率图"
      },
      tooltip: {},
      xAxis: {},
      yAxis: {
        data: blueArray.map(item => item[0])
      },
      series: [
        {
          name: "频率",
          type: "bar",
          itemStyle: {
            color: "#6495ED"
          },
          data: blueArray.map(item => item[1])
        }
      ]
    });
  }
};
</script>

<style scoped lang="scss">
.lottery {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}
#red-chart {
  width: 45%;
  height: 1000px;
  display: inline-block;
}
#blue-chart {
  width: 45%;
  height: 1000px;
  display: inline-block;
}
</style>
