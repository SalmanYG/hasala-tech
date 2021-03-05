<template>
  <div class="chart card">
      <div class="card-header">
          Spendings Last 30 Days
      </div>
      <canvas ref='chart'></canvas>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
export default {
    props: ['wallet'],
    setup(props) {
        const chart = ref(null)

        onMounted(() => {
            let chartjs = new Chart(chart.value, {
                type: "line",
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [{
                        label: 'Spendings',
                        backgroundColor: '#01b0db',
                        borderColor: '#025b7f',
                        data: [0, 10, 5, 2, 20, 30, 45]
                    }]
                },
                options: {
                    legend: {
                        display: false
                    }
                }
            })
        })

        return { chart }
    }
};
</script>

<style scoped>
.chart {
    margin-bottom: 20px;
}
</style>