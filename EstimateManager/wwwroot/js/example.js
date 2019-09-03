var estimatePreLoad =
{
    "id": "",
    "name": "Estimate Manager Creation",
    "projectTitle": "Estimate Creator",
    "projectOwner": "The Public",
    "companyName": "John Doe INC",
    "date": "2019-05-17",
    "sections": [
        {
            "id": "47c230c7-1360-f446-e998-068fcb76c188",
            "name": "Design",
            "sectionRate": 65,
            "sectionWeightOptimistic": 1,
            "sectionWeightLikely": 2,
            "sectionWeightPessimistic": 3,
            "includePert": true,
            "lineItems": [
                {
                    "id": "0bf1b0f8-0543-dcf6-72ab-5bb0592b60e6",
                    "task": "Determine Color Scheme",
                    "description": "Pick colors to compliment and establish roles ",
                    "optimistic": "1",
                    "likely": "2",
                    "pessimistic": "4",
                    "title": "",
                    "hours": 0
                },
                {
                    "id": "f30f7f89-d7c4-d9e6-b091-7412f38b8205",
                    "task": "CSS Grid Training",
                    "description": "As a background to how the page would be designed, we wanted to be able to know how css grids worked. ",
                    "optimistic": "2",
                    "likely": "10",
                    "pessimistic": "19",
                    "title": "",
                    "hours": 0
                },
                {
                    "id": "ac58a788-bf5a-c66c-4a40-c1af9ec82ce0",
                    "task": "Font search and style",
                    "description": "Font search, using google fonts",
                    "optimistic": "1",
                    "likely": "1",
                    "pessimistic": "15",
                    "title": "",
                    "hours": 0
                }
            ]
        },
        {
            "id": "ce47569a-64ef-af29-15a0-9a292ae22da1",
            "name": "Html/CSS/JS",
            "sectionRate": 85,
            "sectionWeightOptimistic": 1,
            "sectionWeightLikely": 2.5,
            "sectionWeightPessimistic": 3.5,
            "includePert": true,
            "lineItems": [
                {
                    "id": "e77e70a6-b7ba-f1e9-fddb-8216a8272ce7",
                    "task": "Header grid",
                    "description": "The header description. Static format, no need for Vue specific work",
                    "optimistic": "2",
                    "likely": "3",
                    "pessimistic": "5",
                    "title": "",
                    "hours": 0
                },
                {
                    "id": "82506380-ab07-c773-d0a8-a037b9256703",
                    "task": "Section style",
                    "description": "This is for the parent section, but not totals or individual line items",
                    "optimistic": "2",
                    "likely": "3",
                    "pessimistic": "6",
                    "title": "",
                    "hours": 0
                },
                {
                    "id": "d6a30d37-7840-4157-60e7-0a1d46e78a43",
                    "task": "Line Item Style",
                    "description": "Styling of individual line items, but no work on binding or repeaters",
                    "optimistic": "1",
                    "likely": "3",
                    "pessimistic": "4",
                    "title": "",
                    "hours": 0
                },
                {
                    "id": "6cb18c49-a959-6b75-bd98-8b1b499b9be3",
                    "task": "Vue integration",
                    "description": "Binding the styles to JS object values and adding repeaters to the styled items",
                    "optimistic": "1",
                    "likely": "2",
                    "pessimistic": "4",
                    "title": "",
                    "hours": 0
                }
            ]
        },
        {
            "id": "7013192e-d583-8af5-2681-679735d4ef95",
            "name": "Hosting",
            "sectionRate": 50,
            "sectionWeightOptimistic": 1,
            "sectionWeightLikely": 2,
            "sectionWeightPessimistic": 2,
            "includePert": true,
            "lineItems": [
                {
                    "id": "9f8ca63b-0e3d-9555-0ccf-ba9fee175203",
                    "task": "Setup deployment process",
                    "description": "In order for future features to be developer, we will setup CI/CD so stability of updates is assured.",
                    "optimistic": "2",
                    "likely": "3",
                    "pessimistic": "4",
                    "title": "",
                    "hours": 0
                },
                {
                    "id": "05704fda-b046-8f13-0ccc-7144532651ee",
                    "task": "Create app services",
                    "description": "Create space and service to host applications",
                    "optimistic": "1",
                    "likely": "2",
                    "pessimistic": "2",
                    "title": "",
                    "hours": 0
                },
                {
                    "id": "d01625b2-0bb8-6071-bcc1-d2020540b4e4",
                    "task": "Setup User management and DB",
                    "description": "For future versions, these features can be put in place so we can take advantage of them in future dev cycles without having to open setup again.",
                    "optimistic": "1",
                    "likely": "2",
                    "pessimistic": "4",
                    "title": "",
                    "hours": 0
                }
            ]
        }
    ]
};