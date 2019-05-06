namespace BankOCR
{
    using FluentAssertions;
    using Xunit;

    public class EntryParserFacts
    {
        private readonly EntryParser testee;

        public EntryParserFacts()
        {
            this.testee = new EntryParser();
        }

        [Theory]
        [InlineData(
@" _  _  _  _  _  _  _  _  _ 
| || || || || || || || || |
|_||_||_||_||_||_||_||_||_|",
"000000000")]
        [InlineData(
@"    _  _     _  _  _  _  _ 
  | _| _||_||_ |_   ||_||_|
  ||_  _|  | _||_|  ||_| _|",
"123456789")]
        public void Parses_Line(
            string line,
            string expectedAccountNumber)
        {
            var entry = this.testee.Parse(
                line);

            entry.Should().Be(
                new Entry(
                    expectedAccountNumber,
                    Status.OK));
        }

        [Theory]
        [InlineData(
            @"    _  _     _  _  _  _  _ 
  | _| _||_||_ |_   ||_|| |
  | _| _|  | _||_|  ||_||_|")]
        public void WrongChecksum_ReturnsError(
            string line)
        {
            var entry = this.testee.Parse(line);

            entry.Status.Should().Be(Status.ERR);
        }
    }
}