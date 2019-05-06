namespace BankOCR
{
    using System.Linq;
    using FluentAssertions;
    using Xunit;

    public class ChecksumValidatorFacts
    {
        private readonly ChecksumValidator testee;

        public ChecksumValidatorFacts()
        {
            this.testee = new ChecksumValidator();
        }

        [Theory]
        [InlineData("133456780", false)]
        [InlineData("123456789", true)]
        [InlineData("345882865", true)]
        public void ReturnsValidationResult(
            string input,
            bool expectedResult)
        {
            var result = this.testee.IsValid(
                input);

            result.Should().Be(expectedResult);
        }
    }
}