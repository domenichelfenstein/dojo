namespace BankOCR
{
    public struct Entry
    {
        public Entry(
            string accountNumber,
            Status status)
        {
            this.AccountNumber = accountNumber;
            this.Status = status;
        }
        public string AccountNumber { get; }

        public Status Status { get; }

        public string ToSerializedString()
        {
            var postfix = "";
            switch (this.Status)
            {
                case Status.ERR: postfix = " ERR"; break;
                case Status.ILL: postfix = " ILL"; break;
            }

            return $"{this.AccountNumber}{postfix}";
        }
    }
}