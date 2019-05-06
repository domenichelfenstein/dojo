namespace BankOCR
{
    public class ChecksumValidator
    {
        public bool IsValid(string accountNumber)
        {
            var d1 = int.Parse(accountNumber.Substring(8,1));
            var d2 = int.Parse(accountNumber.Substring(7,1));
            var d3 = int.Parse(accountNumber.Substring(6,1));
            var d4 = int.Parse(accountNumber.Substring(5,1));
            var d5 = int.Parse(accountNumber.Substring(4,1));
            var d6 = int.Parse(accountNumber.Substring(3,1));
            var d7 = int.Parse(accountNumber.Substring(2,1));
            var d8 = int.Parse(accountNumber.Substring(1,1));
            var d9 = int.Parse(accountNumber.Substring(0,1));
            
            return (d1 + 2*d2 + 3*d3 + 4*d4 + 5*d5 + 6*d6 + 7*d7 + 8*d8 + 9*d9) % 11 == 0;
        }
    }
}