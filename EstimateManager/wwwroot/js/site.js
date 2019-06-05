var estimateVue;
var hasUpdates = false;

var lineTemplate =
{
    id: "",
    task: "",
    description: "",
    optimistic: null,
    likely: null,
    pessimistic: null
};

var sectionTemplate =
{
    id: "",
    name: "",
    sectionRate: 50,
    sectionWeightOptimistic: 1,
    sectionWeightLikely: 2,
    sectionWeightPessimistic: 2,
    includePert: true,
    lineItems:
        [

        ]

};

var estimateSheet = {
    id: "",
    name: "",
    projectTitle: "",
    projectOwner: "",
    companyName: "",
    date: GetToday(),
    sections:
        [

        ]
};

function HomeLoad() {

    var savedSheet = localStorage.getItem("EstimateSheet");

    if (savedSheet !== null) {
        estimateSheet = JSON.parse(savedSheet);
    }

    document.querySelector('body').addEventListener('keydown', function (event) {
        if (event.target.tagName.toLowerCase() === "textarea") {
            SizeTextArea(event.target);
        }
    });

    document.querySelector('body').addEventListener('keydown', function (event) {
        if (event.keyCode === 13) {
            if (event.target.getAttribute('allowmulti') !== "true") {
                event.target.blur();
                return false;
            }
        }
    });

    estimateVue = new Vue({
        el: '#estimate',
        data: estimateSheet,
        computed: {
            EstimateTotal: function () {
                var totalVal = 0;
                for (var j = 0; j < estimateSheet.sections.length; j++) {
                    totalVal += this.SectionHours(estimateSheet.sections[j]) * estimateSheet.sections[j].sectionRate;
                }

                return this.FormatCurrency(totalVal);
            }
        },
        methods: {
            //AddSection: function () {
            //    AddSection();
            //},
            AddLine: function (sectionId) {
                AddLine(sectionId);
            },
            RemoveSection: function (sectionId) {
                if (confirm("Are you sure you want to delete this section and all of its line items?")) {
                    RemoveSection(sectionId);
                }
            },
            RemoveLine: function (sectionId, lineId) {
                RemoveLine(sectionId, lineId);
            },
            CalcPert: function (line, opt, likely, pess) {
                return calculatePert(line, opt, likely, pess);
            },
            SectionHours: function (section) {
                var total = 0;
                for (var i = 0; i < section.lineItems.length; i++) {
                    total += calculatePert(section.lineItems[i], section.sectionWeightOptimistic, section.sectionWeightLikely, section.sectionWeightPessimistic);
                }

                return total;
            },
            FormatCurrency: function (val) {
                return "$" + val.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            },
            ToggleMgrDrawer: function (sectionId) {
                var sectionMgrCnt = document.querySelector("[section-id='" + sectionId + "'] > .section-manager > .section-manager-content");
                var dropped = sectionMgrCnt.getAttribute("dropped");

                if (dropped === "false") {
                    sectionMgrCnt.style.top = "0px";
                    sectionMgrCnt.querySelector('.mgr-arrow').innerHTML = "&#9650";
                    sectionMgrCnt.setAttribute("dropped", "true");
                } else {
                    sectionMgrCnt.style.top = "-30px";
                    sectionMgrCnt.querySelector('.mgr-arrow').innerHTML = "&#9660";
                    sectionMgrCnt.setAttribute("dropped", "false");
                }                
            }
        },
        mounted: function () {
            //console.log('mounted fired');
            if (estimateSheet.sections.length === 0) {
                AddSection();
            }
            document.querySelector('.container').style.display = "flex";
        },
        updated: function () {
            //console.log('Updated fired');
            hasUpdates = true;
        }
    });

    SaveToLocal();

    document.querySelectorAll('textarea').forEach(e => { SizeTextArea(e); });
}

function AddSection() {
    var newSection = JSON.parse(JSON.stringify(sectionTemplate));
    newSection.id = Guid();
    newSection.name = "";
    newSection.sectionRate = 50;
    estimateSheet.sections.push(newSection);
    AddLine(newSection.id);
}

function AddLine(sectionId) {
    for (var i = 0; i < estimateSheet.sections.length; i++) {
        if (sectionId === estimateSheet.sections[i].id) {
            var newLine = JSON.parse(JSON.stringify(lineTemplate));
            newLine.id = Guid();
            newLine.title = "";
            newLine.hours = 0;
            estimateSheet.sections[i].lineItems.push(newLine);
            break;
        }
    }

    //SetDrawerPositions();
}

function RemoveSection(sectionId) {
    for (var i = 0; i < estimateSheet.sections.length; i++) {
        if (estimateSheet.sections[i].id === sectionId) {
            estimateSheet.sections.splice(i, 1);
            break;
        }
    }

    //SetDrawerPositions();
}

function RemoveLine(sectionId, lineId) {
    for (var i = 0; i < estimateSheet.sections.length; i++) {
        if (estimateSheet.sections[i].id === sectionId) {
            for (var j = 0; j < estimateSheet.sections[i].lineItems.length; j++) {
                if (estimateSheet.sections[i].lineItems[j].id === lineId) {
                    estimateSheet.sections[i].lineItems.splice(j, 1);
                    break;
                }
            }
            break;
        }
    }

    //SetDrawerPositions();
}

function calculatePert(line, opt, likely, pess) {
    var optCalc = Number(opt) * Number(line.optimistic);
    var likelyCalc = Number(likely) * Number(line.likely);
    var pessCalc = Number(pess) * Number(line.pessimistic);

    var opinionCalc = optCalc + likelyCalc + pessCalc;
    var weightCalc = Number(opt) + Number(likely) + Number(pess);

    return Math.ceil(opinionCalc / weightCalc);
}

function Guid() {
    return S4() + S4() + '-' + S4() + '-' + S4() + '-' +
        S4() + '-' + S4() + S4() + S4();
}

function S4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

function GetToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

function SaveAndDownload() {

    //these values are pretty arbitrary to get around the pdf generation limitations
    var width = 1600;
    var height = document.body.scrollHeight;

    //var pdf = new jsPDF('landscape', 'px', [width, height]);
    //document.getElementsByTagName('body')[0].style.width = "1400px";


    var pdf = new jsPDF('p', 'pt', [1400, height / 1.3]);

    AdjustDomForPDF(true);

    pdf.html(document.body, {
        callback: function (pdf) {
            pdf.save('Estimate.pdf');
            AdjustDomForPDF(false);
        }
    });
}

function AdjustDomForPDF(forPdf) {
    if (forPdf) {

        document.getElementsByTagName('body')[0].style.width = "1400px";
        document.getElementsByTagName('header')[0].style.display = "none";

        var divsToSpace = document.getElementsByTagName('div');
        for (var i = 0; i < divsToSpace.length; i++) {
            divsToSpace[i].style.wordSpacing = '5px';
        }

        addLinesToHide = document.querySelectorAll(".add-line");
        for (i = 0; i < addLinesToHide.length; i++) {
            addLinesToHide[i].style.display = 'none';
        }

        removeLinesToHide = document.querySelectorAll(".remove-line");
        for (i = 0; i < removeLinesToHide.length; i++) {
            removeLinesToHide[i].style.display = 'none';
        }

        removeSectionsToHide = document.querySelectorAll(".remove-section");
        for (i = 0; i < removeSectionsToHide.length; i++) {
            removeSectionsToHide[i].style.display = 'none';
        }

        sectionToFormat = document.querySelectorAll("#estimate .section");
        for (i = 0; i < sectionToFormat.length; i++) {
            sectionToFormat[i].style.gridTemplateColumns = '15% 26% 8% 8% 8% 8% 11% auto';
        }

        document.getElementById('saving').style.display = 'none';
        //document.getElementById('manager-drawer').style.display = "none";
    }
    else {

        document.getElementsByTagName('body')[0].style.width = "100%";
        document.getElementsByTagName('header')[0].style.display = "block";

        var divsToUnspace = document.getElementsByTagName('div');
        for (var j = 0; j < divsToUnspace.length; j++) {
            divsToUnspace[j].style.wordSpacing = '0px';
        }

        addLinesToShow = document.querySelectorAll(".add-line");
        for (j = 0; j < addLinesToShow.length; j++) {
            addLinesToShow[j].style.display = 'block';
        }

        removeLinesToShow = document.querySelectorAll(".remove-line");
        for (j = 0; j < removeLinesToShow.length; j++) {
            removeLinesToShow[j].style.display = 'block';
        }

        removeSectionsToShow = document.querySelectorAll(".remove-section");
        for (j = 0; j < removeSectionsToShow.length; j++) {
            removeSectionsToShow[j].style.display = 'block';
        }

        sectionToRestore = document.querySelectorAll("#estimate .section");
        for (j = 0; j < sectionToRestore.length; j++) {
            sectionToRestore[j].style.gridTemplateColumns = '15% 26% 8% 8% 8% 8% 11% auto 20px';
        }

        document.getElementById('saving').style.display = 'block';
        //document.getElementById('manager-drawer').style.display = "block";
    }
}

function SaveToLocal() {

    if (hasUpdates) {
        fadeIn('saving', 8);
        localStorage.setItem('EstimateSheet', JSON.stringify(estimateSheet));
        hasUpdates = false;
    }

    fadeOut('saving', 0);
    setTimeout(SaveToLocal, 10000);
}

function SizeTextArea(textarea) {
    textarea.style.height = "";
    textarea.style.height = textarea.scrollHeight - 4 + 'px';
}

function fadeOut(id, val) {
    if (isNaN(val)) {
        val = 9;
    }
    document.getElementById(id).style.opacity = '0.' + val;
    if (val > 0) {
        val--;
        setTimeout('fadeOut("' + id + '",' + val + ')', 90);
    } else {
        return;
    }
}

function fadeIn(id, val) {
    // ID of the element to fade, Fade value[min value is 0]
    if (isNaN(val)) {
        val = 0;
    }
    document.getElementById(id).style.opacity = '0.' + val;
    if (val < 9) {
        val++;
        setTimeout('fadeIn("' + id + '",' + val + ')', 90);
    } else {
        return;
    }
}

