using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateWishlist : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Wishlists_WishlistId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_WishlistId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "WishlistId",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<string>(
                name: "ClientId",
                table: "Wishlists",
                type: "varchar(255)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Wishlists_ClientId",
                table: "Wishlists",
                column: "ClientId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Wishlists_AspNetUsers_ClientId",
                table: "Wishlists",
                column: "ClientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Wishlists_AspNetUsers_ClientId",
                table: "Wishlists");

            migrationBuilder.DropIndex(
                name: "IX_Wishlists_ClientId",
                table: "Wishlists");

            migrationBuilder.AlterColumn<int>(
                name: "ClientId",
                table: "Wishlists",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "WishlistId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_WishlistId",
                table: "AspNetUsers",
                column: "WishlistId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Wishlists_WishlistId",
                table: "AspNetUsers",
                column: "WishlistId",
                principalTable: "Wishlists",
                principalColumn: "Id");
        }
    }
}
