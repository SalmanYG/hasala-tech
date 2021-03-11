<template>
  <div class="chart card">
      <div class="card-header">
          Spendings Per Category (Last 31 Days)
      </div>
      <canvas ref='chart'></canvas>
  </div>
</template>

<script>
import { onBeforeMount, onBeforeUpdate, onMounted, onUpdated, ref } from 'vue';
export default {
    props: ['data'],
    setup(props) {
        const chart = ref(null)
        const datta = ref([])
        let chartjs = undefined
        let isFirst = true
        //I need to modify this to make it 'update' the chart, not create a new one above it.
        onUpdated(() => {
            if(isFirst) {
                chartjs = new Chart(chart.value, {
                    type: "pie",
                    data: {
                        labels: ['Housing', 'Transportation', 'Food', 'Utilities', 'Healthcare', 'Personal', 'Bills', 'Entertainment', 'Emergency'],
                        datasets: [{
                            data: props.data,
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
                isFirst = false
            } else {
                chartjs.destroy()
                chartjs = new Chart(chart.value, {
                    type: "pie",
                    data: {
                        labels: ['Housing', 'Transportation', 'Food', 'Utilities', 'Healthcare', 'Personal', 'Bills', 'Entertainment', 'Emergency'],
                        datasets: [{
                            data: props.data,
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
                        },
                        animation: {
                            duration: 0
                        }
                    }
                })
            }
            
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