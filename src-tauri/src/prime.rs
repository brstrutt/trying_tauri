
#[tauri::command]
pub fn is_prime(number: i32) -> bool {
    if number < 2 { return false; }
    if number < 4 { return true; }
    if number % 2 == 0 { return false; }

    let square_rt: i32 = f64::from(number).sqrt().ceil() as i32;
    let numbers_to_test = (3..=square_rt).step_by(2);
    for i in numbers_to_test {
        if number % i == 0 { return false; }
    }
    return true;
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_known_primes() {
        let known_primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];

        for i in 0..100 {
            assert_eq!(is_prime(i), known_primes.contains(&i), "Failed on {}", i);
        }
    }
}
