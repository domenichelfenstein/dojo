namespace BankOCR
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class FileParser
    {
        private readonly EntryParser entryParser;

        public FileParser()
        {
            this.entryParser = new EntryParser();
        }

        public IReadOnlyCollection<Entry> Parse(
            IOcrFile file)
        {
            var content = file.Content;

            var lines = content.Split(new[] { Environment.NewLine }, StringSplitOptions.None);

            var entries = new List<string>();

            for (int i = 0; i < lines.Length; i += 4)
            {
                entries.Add(
                    lines[i] + Environment.NewLine +
                    lines[i + 1] + Environment.NewLine +
                    lines[i + 2]);
            }

            return entries
                .Select(e =>
                    this.entryParser
                        .Parse(
                            e))
                .ToArray();
        }
    }
}