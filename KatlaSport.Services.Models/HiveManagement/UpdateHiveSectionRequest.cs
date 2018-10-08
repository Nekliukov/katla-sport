namespace KatlaSport.Services.HiveManagement
{
    /// <summary>
    /// Represents a request for creating and updating a hive section.
    /// </summary>
    public class UpdateHiveSectionRequest
    {
        /// <summary>
        /// Gets or sets a store hive section name.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets a store hive section code.
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// Gets or sets the store hive identifier.
        /// </summary>
        public int StoreHiveId { get; set; }
        /* PS: This property needs here to set the store hive id because new section
         doesn't know with which hive it must be connected */
    }
}
