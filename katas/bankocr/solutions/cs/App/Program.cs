namespace App
{
    using System;
    using System.IO;
    using System.Linq;
    using BankOCR;

    public static class Program
    {
        private const string OUTPUT = "result.txt";
        public const string INPUT = "testfile.txt";

        public static void Main(string[] args)
        {
            IOcrFile file = new OcrFile();
            var parser = new FileParser();

            var entries = parser.Parse(file);

            var content = string.Join(
                Environment.NewLine,
                entries.Select(e => e.ToSerializedString()));

            Console.Write(content);
            File.WriteAllText(
                OUTPUT,
                content);
        }
    }

    internal class OcrFile : IOcrFile
    {
        public string Content => File.ReadAllText(Program.INPUT);
    }
}
