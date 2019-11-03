namespace Tests.TestDoubles
{
    using System.Collections.Generic;
    using System.Linq;
    using App;

    public class FileAccessWrapperSpy : IFileAccessWrapper
    {
        private readonly IReadOnlyCollection<string> textLines;
        private int textLineIndex;

        public FileAccessWrapperSpy(
            IReadOnlyCollection<string> textLines)
        {
            this.textLines = new List<string>(textLines);
            this.textLineIndex = 0;
        }

        public bool DisposeHasBeenCalled { get; private set; } = false;

        public string GetTextLine()
        {
            // Diese Logik macht es schon praktisch zu einem Fake
            return this.textLines
                .Skip(this.textLineIndex++)
                .FirstOrDefault();
        }

        public void Dispose()
        {
            this.DisposeHasBeenCalled = true;
        }
    }
}