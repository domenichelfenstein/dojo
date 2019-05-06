namespace BankOCR
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class EntryParser
    {
        private const int DIGIT_LENGTH = 3;
        private const int ENTRY_LENGTH = 27;
        private readonly DigitParser digitParser;
        private ChecksumValidator checksumValidator;

        public EntryParser()
        {
            this.digitParser = new DigitParser();
            this.checksumValidator = new ChecksumValidator();
        }

        public Entry Parse(
            string entry)
        {
            var lines = entry
            .Split(new[] { Environment.NewLine, "\r\n" }, StringSplitOptions.None)
            .ToArray();

            var result = new List<int>();
            for (var i = 0; i < ENTRY_LENGTH; i += DIGIT_LENGTH)
            {
                var input = lines
                    .Select(l => l.Length >= DIGIT_LENGTH ? l.Substring(i, DIGIT_LENGTH) : "   ")
                    .Aggregate("", (a, b) => a + b + Environment.NewLine);

                result.Add(
                    this.digitParser
                        .Parse(input));
            }

            var accountNumber = result
                .Aggregate("", (a, b) => $"{a}{b}");

            return new Entry(
                accountNumber,
                this.checksumValidator.IsValid(accountNumber)
                    ? Status.OK
                    : Status.ERR);
        }
    }
}