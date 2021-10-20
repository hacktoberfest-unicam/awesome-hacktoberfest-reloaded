// IL PEGGIOR SASSO CARTA FORBICE IN RUST

use std::env;

fn main() {

    let args: Vec<String> = env::args().collect();


    let p1 = &args[1];
    let p2 = &args[2];

    match p1.as_str() {
        "sasso" => {
            match p2.as_str() {
                    "sasso"     => parita(),
                    "forbice"   => vittoria(),
                    "carta"     => sconfitta(),
                    _           => panic!("PANIC ERROR"),
                }
            },
            "carta" => {
                match p2.as_str() {
                    "sasso"     => vittoria(),
                    "forbice"   => sconfitta(),
                    "carta"     => parita(),
                    _           => panic!("PANIC ERROR"),
                }
            },
            "forbice" => {
                match p2.as_str() {
                    "sasso"     => sconfitta(),
                    "forbice"   => parita(),
                    "carta"     => vittoria(),
                    _           => panic!("PANIC ERROR"),
                    }
                   },
            _   => panic!("NON E' UNA OPZIONE DISPONIBILE"),
    }

}

fn parita(){
    println!("PARI");
}

fn vittoria() {
    println!("VITTORIA");
}

fn sconfitta() {
    println!("SCONFITTA");
}
