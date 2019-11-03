namespace App
{
    using System.IO;

    public class HtmlPagesConverter
    {
        private readonly IFileAccessWrapper fileAccess;

        public HtmlPagesConverter(
            IFileAccessWrapper fileAccess)
        {
            this.fileAccess = fileAccess;
        }

        public string ConvertToHtml()
        {
            using (this.fileAccess)
            {
                string html = string.Empty;

                string line = this.fileAccess.GetTextLine();
                while (line != null)
                {
                    html += HttpUtility.HtmlEncode(line);
                    html += "<br />";
                    line = this.fileAccess.GetTextLine();
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