const lineItemComponent = Vue.component('line-item', {
    props: ['lineItem', 'opt', 'likely', 'pess', 'rate'],
    computed: {
        CalcPert: function () {
            var optCalc = Number(opt) * Number(line.optimistic);
            var likelyCalc = Number(likely) * Number(line.likely);
            var pessCalc = Number(pess) * Number(line.pessimistic);

            var opinionCalc = optCalc + likelyCalc + pessCalc;
            var weightCalc = Number(opt) + Number(likely) + Number(pess);

            return Math.ceil(opinionCalc / weightCalc);
        }
    },
    methods: {
        FormatCurrency: function (val) {
            return FormatToCurrency(val);
        }
    },
    template: `
        <div class="line-task"><input v-model="lineItem.task" placeholder="[Task Name]" /></div>
        <div class= "line-description" > <textarea v-model="lineItem.description" allowmulti="true" placeholder="[Description]"></textarea></div>
        <div class="line-optimistic"><input v-model="lineItem.optimistic" placeholder="0" type="number" /></div>
        <div class="line-likely"><input v-model="lineItem.likely" placeholder="0" type="number" /></div>
        <div class="line-pessimistic"><input v-model="lineItem.pessimistic" placeholder="0" type="number" /></div>
        <div class="line-calculated">{{ CalcPert }}</div>
        <div class="line-estimated"></div>
        <div class="line-cost">{{ FormatCurrency(CalcPert * section.sectionRate) }}</div>
        <div v-on: click="RemoveLine(section.id, lineItem.id)" class="remove-line">-</div>
        `
});

const sectionComponent = Vue.component('section', {
    props: ['section'],
    components: {
        'line-item': lineItemComponent
    },
    methods: {
        FormatCurrency: function (val) {
            return FormatToCurrency(val);
        },
        AddLine: function (sectionId) {
            AddLine(sectionId);
        },
        RemoveLine: function (sectionId, lineId) {
            RemoveLine(sectionId, lineId);
        }
    },
    computed: {
        SectionHours: function () {
            var total = 0;
            for (var i = 0; i < this.$refs.columns.length; i++) {
                total += this.$refs.columns[i].CalcPert;
            }

            return total;
        }
    },
    template: `
        <div class="section-header"><input v-model="section.name" placeholder="[Section Title]" /></div>
        <div class="section-hours">{{ SectionHours(section) }}</div>
        <div class="section-cost">{{ FormatCurrency(SectionHours(section) * section.sectionRate) }}</div>
        <template v-for="(lineItem, index) in section.lineItems">
            <lineItem v:bind:lineItem="lineItem" 
                      v:bind:opt="section.sectionWeightOptimistic"
                      v:bind:opt="section.sectionWeightLikely" 
                      v:bind:opt="section.sectionWeightPessimistic" 
                      v:bind:rate="section.sectionRate"
                      ref="lines">
            </lineItem>"
        </template>
        <div v-on:click="AddLine(section.id)" class="add-line">+</div>
        `
});


function FormatToCurrency(val) {
    return "$" + val.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}