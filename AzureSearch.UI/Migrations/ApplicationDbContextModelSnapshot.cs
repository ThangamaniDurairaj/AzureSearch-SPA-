﻿
using AzureSearch.DAL;
using AzureSearch.DAL.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using System;

namespace AzureSearch.UI.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("AzureSearch.DAL.Models.ApplicationRole", b =>
            {
                b.Property<string>("Id")
                    .ValueGeneratedOnAdd();

                b.Property<string>("ConcurrencyStamp")
                    .IsConcurrencyToken();

                b.Property<string>("CreatedBy");

                b.Property<DateTime>("CreatedDate");

                b.Property<string>("Description");

                b.Property<string>("Name")
                    .HasMaxLength(256);

                b.Property<string>("NormalizedName")
                    .HasMaxLength(256);

                b.Property<string>("UpdatedBy");

                b.Property<DateTime>("UpdatedDate");

                b.HasKey("Id");

                b.HasIndex("NormalizedName")
                    .IsUnique()
                    .HasName("RoleNameIndex")
                    .HasFilter("[NormalizedName] IS NOT NULL");

                b.ToTable("AspNetRoles");
            });

            modelBuilder.Entity("AzureSearch.DAL.Models.ApplicationUser", b =>
            {
                b.Property<string>("Id")
                    .ValueGeneratedOnAdd();

                b.Property<int>("AccessFailedCount");

                b.Property<string>("ConcurrencyStamp")
                    .IsConcurrencyToken();

                b.Property<string>("Configuration");

                b.Property<string>("CreatedBy");

                b.Property<DateTime>("CreatedDate");

                b.Property<string>("Email")
                    .HasMaxLength(256);

                b.Property<bool>("EmailConfirmed");

                b.Property<string>("FullName");

                b.Property<bool>("IsEnabled");

                b.Property<string>("JobTitle");

                b.Property<bool>("LockoutEnabled");

                b.Property<DateTimeOffset?>("LockoutEnd");

                b.Property<string>("NormalizedEmail")
                    .HasMaxLength(256);

                b.Property<string>("NormalizedUserName")
                    .HasMaxLength(256);

                b.Property<string>("PasswordHash");

                b.Property<string>("PhoneNumber");

                b.Property<bool>("PhoneNumberConfirmed");

                b.Property<string>("SecurityStamp");

                b.Property<bool>("TwoFactorEnabled");

                b.Property<string>("UpdatedBy");

                b.Property<DateTime>("UpdatedDate");

                b.Property<string>("UserName")
                    .HasMaxLength(256);

                b.HasKey("Id");

                b.HasIndex("NormalizedEmail")
                    .HasName("EmailIndex");

                b.HasIndex("NormalizedUserName")
                    .IsUnique()
                    .HasName("UserNameIndex")
                    .HasFilter("[NormalizedUserName] IS NOT NULL");

                b.ToTable("AspNetUsers");
            });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd();

                b.Property<string>("ClaimType");

                b.Property<string>("ClaimValue");

                b.Property<string>("RoleId")
                    .IsRequired();

                b.HasKey("Id");

                b.HasIndex("RoleId");

                b.ToTable("AspNetRoleClaims");
            });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd();

                b.Property<string>("ClaimType");

                b.Property<string>("ClaimValue");

                b.Property<string>("UserId")
                    .IsRequired();

                b.HasKey("Id");

                b.HasIndex("UserId");

                b.ToTable("AspNetUserClaims");
            });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
            {
                b.Property<string>("UserId");

                b.Property<string>("RoleId");

                b.HasKey("UserId", "RoleId");

                b.HasIndex("RoleId");

                b.ToTable("AspNetUserRoles");
            });

            modelBuilder.Entity("OpenIddict.Models.OpenIddictApplication", b =>
            {
                b.Property<string>("Id")
                    .ValueGeneratedOnAdd();

                b.Property<string>("ClientId")
                    .IsRequired();

                b.Property<string>("ClientSecret");

                b.Property<string>("ConcurrencyToken")
                    .IsConcurrencyToken();

                b.Property<string>("ConsentType");

                b.Property<string>("DisplayName");

                b.Property<string>("Permissions");

                b.Property<string>("PostLogoutRedirectUris");

                b.Property<string>("Properties");

                b.Property<string>("RedirectUris");

                b.Property<string>("Type")
                    .IsRequired();

                b.HasKey("Id");

                b.HasIndex("ClientId")
                    .IsUnique();

                b.ToTable("OpenIddictApplications");
            });

            modelBuilder.Entity("OpenIddict.Models.OpenIddictAuthorization", b =>
            {
                b.Property<string>("Id")
                    .ValueGeneratedOnAdd();

                b.Property<string>("ApplicationId");

                b.Property<string>("ConcurrencyToken")
                    .IsConcurrencyToken();

                b.Property<string>("Properties");

                b.Property<string>("Scopes");

                b.Property<string>("Status")
                    .IsRequired();

                b.Property<string>("Subject")
                    .IsRequired();

                b.Property<string>("Type")
                    .IsRequired();

                b.HasKey("Id");

                b.HasIndex("ApplicationId");

                b.ToTable("OpenIddictAuthorizations");
            });

            modelBuilder.Entity("OpenIddict.Models.OpenIddictScope", b =>
            {
                b.Property<string>("Id")
                    .ValueGeneratedOnAdd();

                b.Property<string>("ConcurrencyToken")
                    .IsConcurrencyToken();

                b.Property<string>("Description");

                b.Property<string>("DisplayName");

                b.Property<string>("Name")
                    .IsRequired();

                b.Property<string>("Properties");

                b.Property<string>("Resources");

                b.HasKey("Id");

                b.HasIndex("Name")
                    .IsUnique();

                b.ToTable("OpenIddictScopes");
            });

            modelBuilder.Entity("OpenIddict.Models.OpenIddictToken", b =>
            {
                b.Property<string>("Id")
                    .ValueGeneratedOnAdd();

                b.Property<string>("ApplicationId");

                b.Property<string>("AuthorizationId");

                b.Property<string>("ConcurrencyToken")
                    .IsConcurrencyToken();

                b.Property<DateTimeOffset?>("CreationDate");

                b.Property<DateTimeOffset?>("ExpirationDate");

                b.Property<string>("Payload");

                b.Property<string>("Properties");

                b.Property<string>("ReferenceId");

                b.Property<string>("Status");

                b.Property<string>("Subject")
                    .IsRequired();

                b.Property<string>("Type")
                    .IsRequired();

                b.HasKey("Id");

                b.HasIndex("ApplicationId");

                b.HasIndex("AuthorizationId");

                b.HasIndex("ReferenceId")
                    .IsUnique()
                    .HasFilter("[ReferenceId] IS NOT NULL");

                b.ToTable("OpenIddictTokens");
            });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
            {
                b.HasOne("AzureSearch.DAL.Models.ApplicationRole")
                    .WithMany("Claims")
                    .HasForeignKey("RoleId")
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
            {
                b.HasOne("AzureSearch.DAL.Models.ApplicationUser")
                    .WithMany("Claims")
                    .HasForeignKey("UserId")
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
            {
                b.HasOne("AzureSearch.DAL.Models.ApplicationRole")
                    .WithMany("Users")
                    .HasForeignKey("RoleId")
                    .OnDelete(DeleteBehavior.Cascade);

                b.HasOne("AzureSearch.DAL.Models.ApplicationUser")
                    .WithMany("Roles")
                    .HasForeignKey("UserId")
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity("OpenIddict.Models.OpenIddictAuthorization", b =>
            {
                b.HasOne("OpenIddict.Models.OpenIddictApplication", "Application")
                    .WithMany("Authorizations")
                    .HasForeignKey("ApplicationId");
            });

            modelBuilder.Entity("OpenIddict.Models.OpenIddictToken", b =>
            {
                b.HasOne("OpenIddict.Models.OpenIddictApplication", "Application")
                    .WithMany("Tokens")
                    .HasForeignKey("ApplicationId");

                b.HasOne("OpenIddict.Models.OpenIddictAuthorization", "Authorization")
                    .WithMany("Tokens")
                    .HasForeignKey("AuthorizationId");
            });
        }
    }
}
