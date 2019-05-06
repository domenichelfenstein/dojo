namespace BankOCR
{
    using FluentAssertions;
    using Xunit;

    public class FileParserFacts
    {
        [Fact]
        public void ParsesFile()
        {
            var input =
@" _  _  _  _  _  _  _  _  _ 
| || || || || || || || || |
|_||_||_||_||_||_||_||_||_|

                           
  |  |  |  |  |  |  |  |  |
  |  |  |  |  |  |  |  |  |

    _  _     _  _  _  _  _ 
  | _| _||_||_ |_   ||_||_|
  ||_  _|  | _||_|  ||_| _|
";
            IOcrFile file = new FakeOcrFile(input);
            var testee = new FileParser();

            var result = testee.Parse(file);

            result.Should().BeEquivalentTo(
                new Entry("000000000", Status.OK),
                new Entry("111111111", Status.ERR),
                new Entry("123456789", Status.OK));
        }
    }

    public class FakeOcrFile : IOcrFile
    {
        public FakeOcrFile(string content)
        {
            this.Content = content;
        }

        public string Content { get; }
    }
}