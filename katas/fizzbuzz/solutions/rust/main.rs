/*
*    First attempt in rust.
*    Co-authored by Christoph Bächler
*/

use std::io;

fn main() {
    let max_number = to_int(read_from(io::stdin()));

    for i in 1..(max_number + 1) {
        println!("{}", fizz_buzz(i));
    }
}

fn fizz_buzz(i: i32) -> String {
    return match i {
        x if x % 3 == 0 && x % 7 == 0 => "FizzBuzz".to_owned(),
        x if x % 7 == 0 => "Buzz".to_owned(),
        x if x % 3 == 0 => "Fizz".to_owned(),
        value => value.to_string(),
    };
}

fn to_int(input: String) -> i32 {
    return match input.trim().parse() {
        Ok(v) => v,
        Err(_) => 0,
    };
}

fn read_from(in_stream: io::Stdin) -> String {
    let mut buffer = String::new();
    return match in_stream.read_line(&mut buffer) {
        Ok(_) => buffer,
        Err(_) => "".to_owned(),
    };
}
