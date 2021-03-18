<template>
  <div class="chart card">
      <div class="card-header">
          Spendings Per Day (Last 31 Days)
      </div>
      <div class="card-body">
          <canvas ref='chart'></canvas>
      </div>
  </div>
</template>

<script>
import { onMounted, onUpdated, ref, watch } from 'vue';
export default {
    props: ['labels', 'data'],
    setup(props) {
        const chart = ref(null)
        let chartjs = undefined
        
        onMounted(() => {
            chartjs = new Chart(chart.value, {
                type: "line",
                data: {
                    labels: props.labels,
                    datasets: [{
                        label: 'Spendings',
                        backgroundColor: '#01b0db',
                        borderColor: '#025b7f',
                        data: props.data
                    }]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            })
        })

        //we can use 'watch' to detect when a variable (or in this case, a prop) is changed
        //it's useful since onUpdated doesn't always detect when a prop is changed exactly
        watch(() => [props.labels, props.data], () => {
            chartjs.destroy()
            chartjs = new Chart(chart.value, {
                type: "line",
                data: {
                    labels: props.labels,
                    datasets: [{
                        label: 'Spendings',
                        backgroundColor: '#01b0db',
                        borderColor: '#025b7f',
                        data: props.data
                    }]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
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