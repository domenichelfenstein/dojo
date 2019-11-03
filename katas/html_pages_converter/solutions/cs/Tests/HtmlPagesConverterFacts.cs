namespace Tests
{
    using App;
    using FluentAssertions;
    using Tests.TestDoubles;
    using Xunit;

    public class HtmlPagesConverterFacts
    {
        [Fact]
        public void Converter_Creates_LineBreaks()
        {
            var lines = new[] { "plain text" };
            var accessWrapper = new FileAccessWrapperSpy(lines);

            var result = new HtmlPagesConverter(accessWrapper)
                .ConvertToHtml();

            result.Should().Be("plain text<br />");
        }

        [Fact]
        public void Converter_Disposes_AtTheEnd()
        {
            var lines = new[] { "plain text" };
            var accessWrapper = new FileAccessWrapperSpy(lines);

            new HtmlPagesConverter(accessWrapper)
                .ConvertToHtml();

            accessWrapper.DisposeHasBeenCalled
                .Should().BeTrue();
        }

        [Fact]
        public void Converter_CanConvert_EmptyFile()
        {
            var lines = new string[0];
            var accessWrapper = new FileAccessWrapperSpy(lines);

            var result = new HtmlPagesConverter(accessWrapper)
                .ConvertToHtml();

            result.Should().BeEmpty();
        }

        [Fact]
        public void Converter_Escapes_Quotes()
        {
            var lines = new[] { "text with 'quotes'" };
            var accessWrapper = new FileAccessWrapperSpy(lines);

            var result = new HtmlPagesConverter(accessWrapper)
                .ConvertToHtml();

            result.Should().Be("text with &quot;quotes&quot;<br />");
        }
    }
}