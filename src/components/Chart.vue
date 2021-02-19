<template>
  <div class="chart">
      <canvas ref='chart'></canvas>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
export default {
    props: ['type', 'data'],
    setup(props) {
        const chart = ref(null)

        onMounted(() => {
            let chartjs = new Chart(chart.value, {
                type: "line",
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [{
                        label: 'Spendings',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: [0, 10, 5, 2, 20, 30, 45]
                    }]
                },
                options: {}
            })
        })

        return { chart }
    }
};
</script>

<style>
</style>