const express = require('express');
const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const Health = require('../models/health'); // Your updated MongoDB collection
const app = express();
const router = express.Router();

router.get('/generate-report', async (req, res) => {
    try {
        // Fetch health records from MongoDB (the 'health' collection now)
        const healthRecords = await Health.find();

        // Initialize PDF document and file path
        const doc = new PDFDocument();
        const filePath = path.join(__dirname, 'Health_Report.pdf');
        const writeStream = fs.createWriteStream(filePath);
    
        // Pipe PDF document to file
        doc.pipe(writeStream);

        // Add Title
        doc.fontSize(18).text('Health Report', { align: 'center' });
        doc.moveDown();

        // Check if there are any health records
        if (healthRecords.length === 0) {
            doc.fontSize(14).text("No health records available.", { align: 'center' });
        } else {
            // Loop through records and add to PDF
            healthRecords.forEach(record => {
                // Add health issue, symptom, and analysis
                doc.fontSize(14).text(`Health Issue: ${record.healthIssue}`);
                doc.fontSize(12).text(`Symptom(s): ${record.symptoms || 'None'}`);
                doc.text(`Analysis: ${record.possibleCause || 'No analysis available'}`);
                doc.moveDown();
            });
        }

        doc.end();

        // Wait until PDF is fully written to file
        writeStream.on('finish', () => {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="Health_Report.pdf"');

            res.download(filePath, 'Health_Report.pdf', (err) => {
                if (err) {
                    console.error("Error downloading PDF:", err);
                    return res.status(500).send("Error downloading report");
                }
                // Delete file after download
                fs.unlink(filePath, (unlinkErr) => {
                    if (unlinkErr) console.error("Error deleting PDF after download:", unlinkErr);
                });
            });
        });

        // Handle write stream error
        writeStream.on('error', (error) => {
            console.error("Error writing PDF:", error);
            res.status(500).send("Error generating PDF report");
        });

    } catch (error) {
        console.error("Error generating report:", error);
        res.status(500).send("Error generating report");
    }
});

module.exports = router;
