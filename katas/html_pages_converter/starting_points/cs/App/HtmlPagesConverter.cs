namespace App
{
    using System.IO;

    public class HtmlPagesConverter
    {
        private readonly string filePath;

        public HtmlPagesConverter(
            string filePath)
        {
            this.filePath = filePath;
        }

        public string ConvertToHtml()
        {
            using (TextReader unicodeFileStream = File.OpenText(this.filePath))
            {
                string html = string.Empty;

                string line = unicodeFileStream.ReadLine();
                while (line != null)
                {
                    html += HttpUtility.HtmlEncode(line);
                    html += "<br />";
                    line = unicodeFileStream.ReadLine();
                }

                return html;
            }
        }

        private class HttpUtility
        {
            public static string HtmlEncode(string line)
            {
                line = line.Replace("<", "&lt;");
                line = line.Replace(">", "&gt;");
                line = line.Replace("&", "&amp;");
                line = line.Replace("\"", "&quot;");
                line = line.Replace("\'", "&quot;");
                return line;
            }
        }
    }
}