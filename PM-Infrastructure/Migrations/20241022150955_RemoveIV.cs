using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PM_Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemoveIV : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IV",
                table: "CredentialsTable");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "IV",
                table: "CredentialsTable",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
