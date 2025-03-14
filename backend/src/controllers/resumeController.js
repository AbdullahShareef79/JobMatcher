const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const ResumeParser = require('resume-parser');
const { analyzeSkills, matchJobs } = require('../services/resumeService');

const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        const filePath = req.file.path;
        res.status(200).json({ message: 'File uploaded successfully.', filePath });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const analyzeResume = async (req, res) => {
    try {
        const { filePath } = req.body;

        if (!filePath) {
            return res.status(400).json({ error: 'File path is required.' });
        }

        const fileExtension = path.extname(filePath).toLowerCase();
        let text = '';

        if (fileExtension === '.pdf') {
            const dataBuffer = fs.readFileSync(filePath);
            const data = await pdfParse(dataBuffer);
            text = data.text;
        } else if (fileExtension === '.docx') {
            const result = await mammoth.extractRawText({ path: filePath });
            text = result.value;
        } else if (fileExtension === '.rtf') {
            // Handle RTF parsing (you may need an additional library)
            text = 'RTF parsing not implemented yet.';
        } else {
            return res.status(400).json({ error: 'Unsupported file type.' });
        }

        // Use resume-parser for structured data
        const parsedResume = await new Promise((resolve, reject) => {
            ResumeParser.parseResumeFile(filePath, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Extract skills from the parsed resume
        const skills = analyzeSkills(text);

        // Match jobs based on skills
        const matchedJobs = matchJobs(skills);

        res.status(200).json({ text, parsedResume, matchedJobs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { uploadResume, analyzeResume };   