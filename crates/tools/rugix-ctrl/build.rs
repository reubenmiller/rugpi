fn main() {
    sidex_build_rs::configure()
        .with_bundle(".")
        .format_generated_code(false)
        .generate()
        .expect("Failed to generate code for Sidex bundles.");
}
