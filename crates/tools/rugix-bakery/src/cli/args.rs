//! Definition of the command line arguments.

use std::path::PathBuf;

use clap::Parser;

use crate::config::systems::Architecture;
use crate::oven::BundleOpts;

/// Command line arguments.
#[derive(Debug, Parser)]
#[command(author, about = None, long_about = None)]
pub struct Args {
    /// Path to the `rugix-bakery.toml` configuration file.
    #[clap(long)]
    pub config: Option<PathBuf>,
    /// The command to execute.
    #[clap(subcommand)]
    pub cmd: Command,
}

/// Commands of the CLI.
#[derive(Debug, Parser)]
pub enum Command {
    /// Bake an image or a layer.
    #[clap(subcommand)]
    Bake(BakeCommand),
    /// Run integration tests.
    Test(TestCommand),
    /// Run an image in a VM.
    Run(RunCommand),
    /// List images, recipes, and layers.
    #[clap(subcommand)]
    List(ListCommand),
    /// Pull in external repositories.
    Pull,
    /// Initialize the project from a template.
    Init(InitCommand),
    /// Spawn a shell in the Rugix Bakery Docker container.
    Shell,
    /// Run Rugix Bundler.
    Bundler(BundlerCommand),
}

/// The `list` command.
#[derive(Debug, Parser)]
pub enum ListCommand {
    /// List available images.
    Systems,
}

/// The `bake` command.
#[derive(Debug, Parser)]
pub enum BakeCommand {
    /// Bake a system
    Image {
        /// The name of the system to bake.
        system: String,
        /// The output path for the resulting files.
        output: Option<PathBuf>,
    },
    /// Bake a layer.
    Layer {
        /// The architecture to bake the layer for.
        #[clap(long)]
        arch: Architecture,
        /// The name of the layer to bake.
        layer: String,
    },
    /// Bake a bundle.
    Bundle {
        system: String,
        output: Option<PathBuf>,
        /// Disable compression of the bundle.
        #[clap(flatten)]
        opts: BundleOpts,
    },
}

/// The `test` command.
#[derive(Debug, Parser)]
pub struct TestCommand {
    pub workflows: Vec<String>,
}

/// The `run` command.
#[derive(Debug, Parser)]
pub struct RunCommand {
    pub system: String,
}

/// The `bake` command.
#[derive(Debug, Parser)]
pub enum InternalCommand {
    MakeImage {
        config: PathBuf,
        source: PathBuf,
        image: PathBuf,
    },
}

/// The `init` command.
#[derive(Debug, Parser)]
pub struct InitCommand {
    /// Template to use.
    pub template: Option<String>,
}

/// The `bundler` command.
#[derive(Debug, Parser)]
pub struct BundlerCommand {
    #[clap(allow_hyphen_values(true))]
    pub args: Vec<String>,
}
