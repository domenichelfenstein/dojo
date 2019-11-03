namespace App
{
    using System;

    public interface IFileAccessWrapper : IDisposable
    {
        string GetTextLine();
    }
}