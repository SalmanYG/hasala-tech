<template>
  <div class="chart card">
      <div class="card-header">
          <h6>Spendings Per Category (Last 31 Days)</h6>
      </div>
      <div class="card-body">
          <canvas ref='chart'></canvas>
      </div>
  </div>
</template>

<script>
import { onBeforeMount, onBeforeUpdate, onMounted, onUpdated, ref, watch } from 'vue';
export default {
    props: ['data'],
    setup(props) {
        const chart = ref(null)
        const emptyData = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        let chartjs = undefined
        //I need to modify this to make it 'update' the chart, not create a new one above it.

        onMounted(() => {
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
                    maintainAspectRatio: false
                }
            })
        })

        //we can use 'watch' to detect when a variable (or in this case, a prop) is changed
        //it's useful since onUpdated doesn't always detect when a prop is changed exactly
        watch(() => props.data, () => {
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
                    },
                    maintainAspectRatio: false
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

@media (min-width: 768px) {
    .card-body {
        height: 15rem;
    }
}
</style>