using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using EstimateManager.Data;
using EstimateManager.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace EstimateManager.Api
{
    [Route("api/pdf")]
    [ApiController]
    public class PDFController : ControllerBase
    {
        [HttpGet]
        [Route("GeneratePDF")]
        public async Task<IActionResult> GeneratePDF()
        {

            //LDBData data = new LDBData();
            //var pdf = data.GetPDF();

            //HtmlToPdf converter = new HtmlToPdf();

            //// set converter options
            ////converter.Options.PdfPageSize = pageSize;
            ////converter.Options.PdfPageOrientation = pdfOrientation;
            ////converter.Options.WebPageWidth = webPageWidth;
            ////converter.Options.WebPageHeight = webPageHeight;

            //// create a new pdf document converting an url
            //PdfDocument doc = converter.ConvertHtmlString(pdf.html);

            //// save pdf document
            //byte[] pdfArr = doc.Save();

            //// close pdf document
            //doc.Close();

            //// return resulted pdf document
            //FileResult fileResult = new FileContentResult(pdfArr, "application/pdf");
            //fileResult.FileDownloadName = "Estimate.pdf";
            //return fileResult;

            return Ok();
        }

        [HttpPost]
        [Route("StorePDF")]
        public async Task<IActionResult> StorePDF([FromBody] PDF content)
        {            
            LDBData data = new LDBData();
            data.SavePDF(content.html);

            return Ok();
        }
    }
}