namespace App
{
    using System;

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
                var html = string.Empty;

                var line = this.fileAccess.GetTextLine();
                while (line != null)
                {
                    html += HtmlEncode(line);
                    html += "<br />";
                    line = this.fileAccess.GetTextLine();
                }

                return html;
            }
        }

        private static string HtmlEncode(string line)
        {
            line = line?.Replace("<", "&lt;", StringComparison.InvariantCulture);
            line = line?.Replace(">", "&gt;", StringComparison.InvariantCulture);
            line = line?.Replace("&", "&amp;", StringComparison.InvariantCulture);
            line = line?.Replace("\"", "&quot;", StringComparison.InvariantCulture);
            line = line?.Replace("\'", "&quot;", StringComparison.InvariantCulture);
            return line;
        }
    }
}