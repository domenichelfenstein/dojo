namespace BankOCR
{
    using FluentAssertions;
    using Xunit;

    public class DigitParserFacts
    {
        private readonly DigitParser testee;

        public DigitParserFacts()
        {
            this.testee = new DigitParser();
        }

        [Theory]
[InlineData(
@" _ 
| |
|_|",
0)]
[InlineData(
@"   
  |
  |",
1)]
[InlineData(
@" _ 
 _|
|_ ",
2)]
[InlineData(
@" _ 
 _|
 _|",
3)]
[InlineData(
@"   
|_|
  |",
4)]
[InlineData(
@" _ 
|_ 
 _|",
5)]
[InlineData(
@" _ 
|_ 
|_|",
6)]
[InlineData(
@" _ 
  |
  |",
7)]
[InlineData(
@" _ 
|_|
|_|",
8)]
[InlineData(
@" _ 
|_|
 _|",
9)]
        public void Parses_Digit(
            string input,
            int expectedResult)
        {
            var digit = this.testee.Parse(
                input);

            digit.Should().Be(expectedResult);
        }
    }
}