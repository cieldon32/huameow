export interface LibraryOptions {
  /**
   * Huameow application name.
   */
  name: string;
  /**
   * Huameow application author.
   */
  author?: string;
  /**
   * Huameow application description.
   */
  description?: string;
  /**
   * Huameow application destination directory
   */
  directory?: string;
  /**
   * Huameow application version.
   */
  version?: string;
  /**
   * Application language.
   */
  language?: string;
  /**
   * The used package manager.
   */
  packageManager?: 'npm' | 'yarn' | 'pnpm';
  /**
   * Huameow included production dependencies (comma separated values).
   */
  dependencies?: string;
  /**
   * Huameow included development dependencies (comma separated values).
   */
  devDependencies?: string;
}
