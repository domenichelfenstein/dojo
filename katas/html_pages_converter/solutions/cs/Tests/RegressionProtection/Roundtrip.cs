namespace Tests.RegressionProtection
{
    using System.IO;
    using App;
    using FluentAssertions;
    using Xunit;

    public class Roundtrip
    {
        [Fact]
        public void UsingRealFileToTestConvertion()
        {
            var fileName = "aFile.txt";
            var file = File.CreateText(fileName);
            file.WriteLine("plain text");
            file.Close();

            var testee = new HtmlPagesConverter(fileName);
            var convertedText = testee.ConvertToHtml();

            convertedText.Should().Be("plain text<br />");
        }
    }
}