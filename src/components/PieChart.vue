<template>
  <div class="chart card">
      <div class="card-header">
          Spendings Per Category
      </div>
      <canvas ref='chart'></canvas>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
export default {
    props: ['data'],
    setup(props) {
        const chart = ref(null)

        //logic to spread two arrays, one for labels, other for quantity, then use them as labels and dataset
        //try to randomise the colors of the borders
        onMounted(() => {
            let chartjs = new Chart(chart.value, {
                type: "pie",
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [{
                        data: [12, 10, 5, 2, 20, 30, 45],
                        backgroundColor: [
                            '#004c6d',
                            '#025b7f',
                            '#036b91',
                            '#047ca4',
                            '#048db6',
                            '#039ec8',
                            '#01b0db',
                            '#00c2ed',
                            '#00d4ff'
                        ]
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