namespace App
{
    using System.IO;

    public class FileSystemAccessWrapper : IFileAccessWrapper
    {
        private readonly StreamReader unicodeFileStream;

        public FileSystemAccessWrapper(
            string filePath)
        {
            this.unicodeFileStream = File.OpenText(filePath);
        }

        public string GetTextLine()
        {
            return unicodeFileStream.ReadLine();
        }

        public void Dispose()
        {
            this.unicodeFileStream?.Dispose();
        }
    }
}