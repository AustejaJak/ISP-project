using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class FixPropertiesOfObjects : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Baskets_AspNetUsers_ClientId1",
                table: "Baskets");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_ClientId1",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_PaymentDetails_AspNetUsers_ClientId1",
                table: "PaymentDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Recommendations_AspNetUsers_ClientId1",
                table: "Recommendations");

            migrationBuilder.DropIndex(
                name: "IX_Recommendations_ClientId1",
                table: "Recommendations");

            migrationBuilder.DropIndex(
                name: "IX_PaymentDetails_ClientId1",
                table: "PaymentDetails");

            migrationBuilder.DropIndex(
                name: "IX_Orders_ClientId1",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Baskets_ClientId1",
                table: "Baskets");

            migrationBuilder.DropColumn(
                name: "ClientId1",
                table: "Recommendations");

            migrationBuilder.DropColumn(
                name: "ClientId1",
                table: "PaymentDetails");

            migrationBuilder.DropColumn(
                name: "ClientId1",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ClientId1",
                table: "Baskets");

            migrationBuilder.AlterColumn<string>(
                name: "ClientId",
                table: "Recommendations",
                type: "varchar(255)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "ClientId",
                table: "PaymentDetails",
                type: "varchar(255)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "ClientId",
                table: "Orders",
                type: "varchar(255)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "ClientId",
                table: "Baskets",
                type: "varchar(255)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<int>(
                name: "Gender",
                table: "AspNetUsers",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AspNetRoles",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Discriminator", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1", null, "IdentityRole", "Admin", "ADMIN" },
                    { "2", null, "IdentityRole", "Client", "CLIENT" },
                    { "3", null, "IdentityRole", "Shop-Employee", "SHOP-EMPLOYEE" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Recommendations_ClientId",
                table: "Recommendations",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentDetails_ClientId",
                table: "PaymentDetails",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ClientId",
                table: "Orders",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_Baskets_ClientId",
                table: "Baskets",
                column: "ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Baskets_AspNetUsers_ClientId",
                table: "Baskets",
                column: "ClientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_ClientId",
                table: "Orders",
                column: "ClientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PaymentDetails_AspNetUsers_ClientId",
                table: "PaymentDetails",
                column: "ClientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Recommendations_AspNetUsers_ClientId",
                table: "Recommendations",
                column: "ClientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Baskets_AspNetUsers_ClientId",
                table: "Baskets");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_ClientId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_PaymentDetails_AspNetUsers_ClientId",
                table: "PaymentDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Recommendations_AspNetUsers_ClientId",
                table: "Recommendations");

            migrationBuilder.DropIndex(
                name: "IX_Recommendations_ClientId",
                table: "Recommendations");

            migrationBuilder.DropIndex(
                name: "IX_PaymentDetails_ClientId",
                table: "PaymentDetails");

            migrationBuilder.DropIndex(
                name: "IX_Orders_ClientId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Baskets_ClientId",
                table: "Baskets");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AspNetRoles");

            migrationBuilder.AlterColumn<int>(
                name: "ClientId",
                table: "Recommendations",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "ClientId1",
                table: "Recommendations",
                type: "varchar(255)",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<int>(
                name: "ClientId",
                table: "PaymentDetails",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "ClientId1",
                table: "PaymentDetails",
                type: "varchar(255)",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<int>(
                name: "ClientId",
                table: "Orders",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "ClientId1",
                table: "Orders",
                type: "varchar(255)",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<int>(
                name: "ClientId",
                table: "Baskets",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "ClientId1",
                table: "Baskets",
                type: "varchar(255)",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Gender",
                table: "AspNetUsers",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Recommendations_ClientId1",
                table: "Recommendations",
                column: "ClientId1");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentDetails_ClientId1",
                table: "PaymentDetails",
                column: "ClientId1");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ClientId1",
                table: "Orders",
                column: "ClientId1");

            migrationBuilder.CreateIndex(
                name: "IX_Baskets_ClientId1",
                table: "Baskets",
                column: "ClientId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Baskets_AspNetUsers_ClientId1",
                table: "Baskets",
                column: "ClientId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_ClientId1",
                table: "Orders",
                column: "ClientId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PaymentDetails_AspNetUsers_ClientId1",
                table: "PaymentDetails",
                column: "ClientId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Recommendations_AspNetUsers_ClientId1",
                table: "Recommendations",
                column: "ClientId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
