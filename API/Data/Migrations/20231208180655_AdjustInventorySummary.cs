using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AdjustInventorySummary : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SKU",
                table: "InventorySummaries");

            migrationBuilder.RenameColumn(
                name: "TotalCost",
                table: "InventorySummaries",
                newName: "AveragePrice");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AveragePrice",
                table: "InventorySummaries",
                newName: "TotalCost");

            migrationBuilder.AddColumn<string>(
                name: "SKU",
                table: "InventorySummaries",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
