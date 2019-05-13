using EstimateManager.Data.Models;
using LiteDB;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace EstimateManager.Data
{
    public class LDBData
    {
        private string _connString { get; set; }
        private string _defaultDir { get; set; } = @"Data\DB\";
        private readonly string _dbFileName = "Estimate.db";

        public LDBData()
        {
            if (!Directory.Exists(_defaultDir))
            {
                Directory.CreateDirectory(_defaultDir);
            }
            _connString = _defaultDir + _dbFileName;
        }

        public bool SavePDF(string html)
        {
            using (var db = new LiteDatabase(_connString))
            {
                PDF pdf = new PDF();
                pdf.html = html;
                pdf.stamp = DateTime.Now;

                var pdfs = db.GetCollection<PDF>("pdfs");

                pdfs.Insert(pdf);                
            }
            return true;
        }

        public PDF GetPDF()
        {
            using (var db = new LiteDatabase(_connString))
            {
                var pdfs = db.GetCollection<PDF>("pdfs");
                var pdf = pdfs.Find(Query.All(Query.Descending), limit: 1).FirstOrDefault();
                return pdf;
            }
        }
    }
}
