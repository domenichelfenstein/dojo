namespace BankOCR
{
    using System;
    using System.Linq;

    public class DigitParser
    {
        private const string ZERO =
            " _ " +
            "| |" +
            "|_|";
        private const string ONE =
            "   " +
            "  |" +
            "  |";
        private const string TWO =
            " _ " +
            " _|" +
            "|_ ";
        private const string THREE =
            " _ " +
            " _|" +
            " _|";
        private const string FOUR =
            "   " +
            "|_|" +
            "  |";
        private const string FIVE =
            " _ " +
            "|_ " +
            " _|";
        private const string SIX =
            " _ " +
            "|_ " +
            "|_|";
        private const string SEVEN =
            " _ " +
            "  |" +
            "  |";
        private const string EIGHT =
            " _ " +
            "|_|" +
            "|_|";
        private const string NINE =
            " _ " +
            "|_|" +
            " _|";

        public int Parse(string input)
        {
            var withoutLineBreaks = input
                .Split(new[] { Environment.NewLine }, StringSplitOptions.None)
                .Aggregate("", (a, b) => a + b);

            switch (withoutLineBreaks)
            {
                case ZERO: return 0;
                case ONE: return 1;
                case TWO: return 2;
                case THREE: return 3;
                case FOUR: return 4;
                case FIVE: return 5;
                case SIX: return 6;
                case SEVEN: return 7;
                case EIGHT: return 8;
                case NINE: return 9;
            }
            
            throw new NotImplementedException(
                withoutLineBreaks);
        }
    }
}